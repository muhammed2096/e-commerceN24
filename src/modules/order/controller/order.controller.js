
import { cartModel } from "../../../../db/models/cart.model.js"
import { couponModel } from "../../../../db/models/coupon.model.js"
import { orderModel } from "../../../../db/models/order.model.js"
import { productModel } from "../../../../db/models/product.model.js"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OyLjB06k8V6miqkOwgi5UmAKs0xuFYClm4oN3pzOoOp9aOW8HNkk2JxjQu3qEiJ8AKslsWHY8QFMHpBLXjdG9aq00fLwb2UKS');


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
const createOnlineSesssion = catchError((request, response) => {
    const sig = request.headers['stripe-signature'].toString();

    let event;
    event = stripe.webhooks.constructEvent(request.body, sig, "whsec_WF0nWyR85dR6RgzLeQAMImxsvqQ6om9Q");
    if (event.type == "checkout.session.completed") {
        card(event.data.object, response)
        console.log("create Order here...");
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }
  });
   
  


export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createCheckOutSession,
    createOnlineSesssion
}