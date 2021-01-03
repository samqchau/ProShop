import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/login', authUser);
userRouter.get('/profile', protect, getUserProfile);

export default userRouter;
