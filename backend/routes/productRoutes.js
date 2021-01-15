import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const productRouter = express.Router();
productRouter
  .get('/', getProducts)
  .post('/', protect, adminOnly, createProduct);
productRouter.get('/top', getTopProducts);
productRouter.post('/:id/reviews', protect, createProductReview);
productRouter
  .get('/:id', getProductById)
  .put('/:id', protect, adminOnly, updateProduct)
  .delete('/:id', protect, adminOnly, deleteProduct);
export default productRouter;
