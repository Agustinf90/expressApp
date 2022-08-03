import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true},
    products: {type: Array, required: true}
});

export const carts = new mongoose.model(cartsCollection, cartsSchema)