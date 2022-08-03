import mongoose from "mongoose";
import * as model from '../models/products.js';
import * as modelCarts from '../models/carts.js';



// let response = await model.products.find({})


let responseCarts = await modelCarts.carts.remove({})
let productosdb = await model.products.remove({})

let carts = []

export async function createCart(req, res) {
   const newCart = {
        timestamp: new Date(),
        products: []
    }
    let responseCarts = await modelCarts.carts.create(newCart)
    carts.push(newCart)
    res.send(responseCarts)
}

export async function getCartById(req, res) {
    let cartId = Number(req.params.id)
    let responseCarts = await modelCarts.carts.find({ id: cartId })
    res.send(responseCarts)
 }


//  export async function deleteCartById(req, res) {
//     let cartId = Number(req.params.id)
//     let responseCarts = await modelCarts.carts.find({ id: cartId })
//     res.send(responseCarts)
//  }
// router.delete('/api/productos/:id1/carrito/:id2', (req, res) => {

//     // let {id1, id2} = req.params
//     // let parseNum = parseInt(id1)
//     // let parseNum2 = parseInt(id2)

//     // let idNum = parseNum
//     // let idNum2 = parseNum2

//     // const cartIn = carts.filter(item => item.id === idNum2)

//     // let prodInCart = cartIn[0].products
//     // const prodIndex = prodInCart.findIndex(product => product.id === idNum)
//     // console.log(prodIndex)
//     // if (~prodIndex) {
//     //     prodInCart.splice(prodIndex, 1) 
//     //    }


//     res.send(responseCarts)
// }
// )
 export async function addProductToCartById(req, res) {
    let cartId = Number(req.params.cartId)
    let productId = Number(req.params.productId)

    let cartActual = await modelCarts.carts.find({ id: cartId })
    let prodActual = await model.products.find({ id: productId })
console.log(carts)
    let cartActual2 = carts.filter((item) => item._id === cartId);
    console.log(cartActual2)
    let prodInCart = cartActual[0].products.find((item) => item.id === prodActual[0].id); 

    if (prodInCart) {
        prodInCart.stock ++
        let response = await modelCarts.carts.update({id: cartId},
            {$set: {'products':[  prodInCart]},})

    }
    else {
        let response = await modelCarts.carts.update({id: cartId},
            {$push: {'products':    prodActual[0]},})
    }


    let responseCarts2 = await modelCarts.carts.find({})
   
    res.send(responseCarts2)
    }



