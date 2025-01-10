import express from 'express';
import { register, login, logout } from '../controller/user.controller.js'; 

const userRouter = express.Router();

userRouter.post('/userregister', register);
userRouter.post('/userlogin', login);
userRouter.post('/userlogout', logout);

export default userRouter;
