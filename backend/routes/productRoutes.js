import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/productController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const productRouter = express.Router();
productRouter
  .get('/', getProducts)
  .post('/', protect, adminOnly, createProduct);
productRouter
  .get('/:id', getProductById)
  .put('/:id', protect, adminOnly, updateProduct)
  .delete('/:id', protect, adminOnly, deleteProduct);
export default productRouter;
