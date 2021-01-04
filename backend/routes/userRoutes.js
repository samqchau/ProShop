import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();
// '/api/users'
userRouter.post('/', registerUser);
userRouter.post('/login', authUser);
userRouter.get('/profile', protect, getUserProfile);

export default userRouter;
