import express from 'express';
import { register, login, logout,updateProfile } from '../controller/user.controller.js'; 
import Authenticated from "../middleware/Authmiddleware.js"

const userRouter = express.Router();

userRouter.post('/userregister', register);
userRouter.post('/userlogin', login);
userRouter.post('/userlogout', logout);
userRouter.post('/userupdate',Authenticated, updateProfile);


export default userRouter;
