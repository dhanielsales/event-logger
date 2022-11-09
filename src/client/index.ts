import 'express-async-errors';
import '../config/enviroment.config';

import express, { Router } from 'express';
import { Product } from './model/product';
import { sendMessageToQueue } from './jobs/sendMessageToQueue';

const server = express();
server.use(express.json());

const router = Router();

const products: Product[] = [];

router.get('/product', (_, res) => {
  return res.json(products);
});

router.post('/product', async (req, res) => {
  const { name, price, quantity, description } = req.body;

  const product = {
    id: products.length + 1,
    name,
    price,
    quantity,
    description,
  };

  products.push(product);

  await res.json(product);

  await sendMessageToQueue(product);
});

server.use(router);
server.listen(3000, () => console.log('Server listen on port 3000'));
