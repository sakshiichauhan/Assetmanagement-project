import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
dotenv.config();

const AuthKey = process.env.SECRET_KEY;

const Authenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, AuthKey);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default Authenticated;