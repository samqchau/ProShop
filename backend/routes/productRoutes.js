import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const productRouter = express.Router();
//@desc Fetch all products
//@route GET /api/products
//@access Public
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//@desc Fetch single product by id
//@route GET /api/products/:id
//@access Public
productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

export default productRouter;
