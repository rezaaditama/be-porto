import { Request, Response, Router } from 'express';
import {
  createProductController,
  getAllProductController,
  getProductByNameController,
} from '../controllers/product.controller';

export const ProductRouter: Router = Router();

ProductRouter.get('/search', getProductByNameController);
ProductRouter.get('/', getAllProductController);
ProductRouter.post('/', createProductController);
