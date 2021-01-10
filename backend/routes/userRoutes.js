import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const userRouter = express.Router();
// '/api/users'
userRouter.get('/', protect, adminOnly, getAllUsers);
userRouter.post('/', registerUser);
userRouter.post('/login', authUser);
userRouter.get('/profile', protect, getUserProfile);
userRouter.put('/profile', protect, updateUserProfile);

userRouter.delete('/:id', protect, adminOnly, deleteUser);

export default userRouter;
