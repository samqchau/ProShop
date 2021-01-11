import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const productRouter = express.Router();
productRouter.get('/', getProducts);
productRouter
  .get('/:id', getProductById)
  .delete('/:id', protect, adminOnly, deleteProduct);

export default productRouter;
