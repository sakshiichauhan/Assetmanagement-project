import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        if (!fullname || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email.", success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({ fullname, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(201).json({ message: "Account created successfully.", success: true });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid email or password.", success: false });
        }

        // Verify role
        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid role for this account.", success: false });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        // Prepare sanitized user data
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            personalInfo: user.personalInfo
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict",
            })
            .json({ message: `Welcome back, ${user.fullname}!`, user: userResponse, success: true });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const logout = (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0, httpOnly: true })
            .json({ message: "Logged out successfully.", success: true });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phone, address, department, jobTitle } = req.body;

        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        // Ensure personalInfo exists
        if (!user.personalInfo) user.personalInfo = {};

        // Update fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phone) user.personalInfo.phone = phone;
        if (address) user.personalInfo.address = address;
        if (department) user.personalInfo.department = department;
        if (jobTitle) user.personalInfo.jobTitle = jobTitle;
        await user.save();

        // Prepare sanitized response
        const sanitizedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            personalInfo: user.personalInfo,
        };

        return res.status(200).json({ message: "Profile updated successfully.", user: sanitizedUser, success: true });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};
