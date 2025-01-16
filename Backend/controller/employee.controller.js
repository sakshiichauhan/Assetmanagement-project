import Employee from "../models/employee.models.js";

import User from "../models/user.js";
export const createEmployee = async (req, res) => {
    try {
        const { department, jobTitle, phone, employeeId } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if an employee already exists for this user
        const existingEmployee = await Employee.findOne({ userId });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists for this user", success: false });
        }

        // Create the new employee
        const newEmployee = await Employee.create({
            name: user.fullname,
            employeeId,
            department,
            jobTitle,
            email: user.email,
            phone,
        });

        return res.status(201).json({
            message: "Employee created successfully",
            success: true,
            employee: newEmployee,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
export const getAllEmployees = async (req, res) => {
    try {
        const { keyword } = req.query;

        // Create a search filter based on the keyword
        let filter = {};
        if (keyword) {
            const regex = new RegExp(keyword, "i"); 
            filter = {
                $or: [
                    { "userId.fullname": regex }, 
                    { "userId.email": regex },   
                    { department: regex },       
                    { jobTitle: regex },        
                ],
            };
        }

        // Find employees and populate necessary fields
        const employees = await Employee.find(filter)
            .populate("userId", "fullname email") // Populate user details
            .populate("assets"); // Populate linked assets

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate("userId", "fullname email") // Populate user details
            .populate("assets"); // Populate linked assets
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
