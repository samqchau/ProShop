import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRouter from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

//routes
app.get('/', (req, res) => {
  res.json('API is running...');
  console.log('Recieved GET request'.bgMagenta.bold.underline);
});

app.use('/api/products', productRouter);

//error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.inverse
      .underline.bold
  )
);
