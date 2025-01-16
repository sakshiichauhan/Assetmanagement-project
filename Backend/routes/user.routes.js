import express from 'express';
import { register, login, logout, getUserDetails } from '../controller/user.controller.js'; 

const userRouter = express.Router();

userRouter.post('/userregister', register);
userRouter.post('/userlogin', login);
userRouter.post('/userlogout', logout);
userRouter.get('/user/:userId', getUserDetails);

export default userRouter;
