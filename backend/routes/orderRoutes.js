import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToShipping,
} from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

orderRouter
  .post('/', protect, addOrderItems)
  .get('/', protect, adminOnly, getOrders);
orderRouter.get('/myorders', protect, getMyOrders);
orderRouter.get('/:id', protect, getOrderById);
orderRouter.put('/:id/pay', protect, updateOrderToPaid);
orderRouter.put('/:id/shipping', protect, adminOnly, updateOrderToShipping);

export default orderRouter;
