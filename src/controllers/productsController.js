import mongoose from "mongoose";
import * as model from '../models/products.js';

let productosdb = await model.products.find({})
let productos = []
const idProds = () => {
    let ids = 0
    productos?.forEach(producto => {
        if (producto.id > ids) {
            ids = producto.id
        }
    })
    return ids
}

export async function getAll(req, res) {

    let responseProducts = await model.products.find({})
    res.send(responseProducts)
}

export async function getProductById(req, res) {

    let prodId = Number(req.params.id)
    let response = await model.products.find({ id: prodId })

    console.log(response)

    if (!prodId) return res.status(400).send({ error: 'No existe ID' })
    res.send({ response })
}

export async function createProduct(req, res) {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        stock: req.body.stock,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: idProds() + 1,
        timestamp: new Date()
    }
    let response = await model.products.create(newProduct)
    productos.push(newProduct)
    res.send(response)
}

export async function updateProductById(req, res) {
    const prodId = Number(req.params.id)
    const updateProd = req.body
    const prodIndex = productos.findIndex(product => product.id === prodId)
    let response = await model.products.updateOne({ id: prodId }, { $set: updateProd })
    let responseUpdated = await model.products.find({ id: prodId })

    res.send(responseUpdated)
    if (~prodIndex) {
        productos[prodIndex] = {
            ...updateProd,
            id: prodId,
            timestamp: new Date()
        }

    }
}

export async function deleteProductById(req, res) {
    const prodId = Number(req.params.id)

    const prodIndex = productos.findIndex(product => product.id === prodId)
    let response = await model.products.remove({ id: prodId })
    if (~prodIndex) {
        productos.splice(prodIndex, 1)

    }
    let responseProducts = await model.products.find({})
    res.send(responseProducts)
}
