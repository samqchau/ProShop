import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const userRouter = express.Router();
// '/api/users'
userRouter.get('/', protect, adminOnly, getAllUsers).post('/', registerUser);
userRouter.post('/login', authUser);
userRouter
  .get('/profile', protect, getUserProfile)
  .put('/profile', protect, updateUserProfile);

userRouter
  .delete('/:id', protect, adminOnly, deleteUser)
  .get('/:id', protect, adminOnly, getUserById)
  .put('/:id', protect, adminOnly, updateUserById);

export default userRouter;
