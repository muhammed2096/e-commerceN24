
import { cartModel } from "../../../../db/models/cart.model.js"
import { couponModel } from "../../../../db/models/coupon.model.js"
import { orderModel } from "../../../../db/models/order.model.js"
import { productModel } from "../../../../db/models/product.model.js"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);


const createCashOrder = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    !cart && next(new appError('cart not found', 404))
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options = cart.cartItems.map((prod) => {
        return ({
            updateOne: {
                "filter": { _id: prod.product },
                "update": { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
            }
        })
    })
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'success', order })
})

const getSpecificOrder = catchError(async (req, res, next) => {
    let order = await orderModel.findOne({user:req.user._id}).populate('orderItems.product')
    res.json({ message: 'success', order })
}) 

const getAllOrders = catchError(async (req, res, next) => {
    let orders = await orderModel.find({}).populate('orderItems.product')
    res.json({ message: 'success', orders })
}) 

const createCheckOutSession = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    !cart && next(new appError('cart not found', 404))
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount:totalOrderPrice*100,
                    product_data:{
                        name:req.user.name
                    }
                },
                quantity: 1
            }
        ],
        mode:'payment',
        success_url:'https://github.com/muhammed2096',
        cancel_url:'https://www.linkedin.com/in/muhammed-mustafa-ba5316292/',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.json({message:'success', session}) 
}) 



export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createCheckOutSession
}