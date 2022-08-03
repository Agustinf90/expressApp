import express from "express";
import * as productsController from "../../controllers/productsController.js";
const productsRouter = express.Router();

productsRouter.get('/:id', productsController.getProductById);
productsRouter.get('/', productsController.getAll);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProductById);
productsRouter.delete('/:id', productsController.deleteProductById);

export default productsRouter;

