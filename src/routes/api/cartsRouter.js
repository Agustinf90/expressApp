import express from "express";
import * as cartsController from "../../controllers/cartsController.js";

const cartsRouter = express.Router();

cartsRouter.get('/:id', cartsController.getCartById);
cartsRouter.post('/:cartId/product/:productId', cartsController.addProductToCartById);
cartsRouter.post('/', cartsController.createCart);
// cartsRouter.delete('/:id', cartsController.deleteCartById);
// cartsRouter.delete('/:id', cartsController.deleteCartById);
export default cartsRouter;