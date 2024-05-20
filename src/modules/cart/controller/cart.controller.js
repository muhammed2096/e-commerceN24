
import { cartModel } from "../../../../db/models/cart.model.js"
import { couponModel } from "../../../../db/models/coupon.model.js"
import { productModel } from "../../../../db/models/product.model.js"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"

const calcTotalPrice = (cart)=>{
    let totalPrice = 0
        cart.cartItems.forEach((item) => {
            totalPrice += (item.quantity || 0) * (item.price || 0);
        })
        cart.totalPrice = totalPrice
    if(cart.discount){
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
        cart.totalPriceAfterDiscount = totalPriceAfterDiscount

    }
}

const addToCart = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if(!product) return next(new appError("Product not found", 404))
    if(req.body.quantity > product.quantity) return next(new appError('Sold out'))    
        req.body.price = product.price
    let isCartExist = await cartModel.findOne({user:req.user._id})
    if(!isCartExist){
        let cart = new cartModel({user:req.user._id, cartItems:[req.body]})
        calcTotalPrice(cart)
        await cart.save()
        !cart && next(new appError('cart not found', 404))
        cart && res.send({ message: 'success', cart })
    }else{
        let item = isCartExist.cartItems.find((item)=> item.product == req.body.product)
        if(item) {
        if(item.quantity >= product.quantity) return next(new appError('Sold out'))
        item.quantity += req.body.quantity || 1;
        }
        else isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({message:"success", cart:isCartExist})
    }
})

const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate({user:req.user._id}, {$pull:{cartItems: {_id:req.params.id}}}, {new:true})
    calcTotalPrice(cart)
    await cart.save()
    !cart && next(new appError('cart not found', 404))
    cart && res.send({ message: 'success', cart })
})
const updateQuantity = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({user:req.user._id})
    !cart && next(new appError('cart not found', 404))
    let item = cart.cartItems.find(item => item._id == req.params.id)
    if(!item) return next(new appError('item not found', 404))
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    cart && res.send({ message: 'success', cart })
})

const getLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
    !cart && next(new appError('cart not found', 404))
    cart && res.send({ message: 'success', cart })
})

const clearUserCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndDelete({user:req.user._id})
    !cart && next(new appError('cart not found', 404))
    cart && res.send({ message: 'success', cart })
})

const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.coupon, expires: { $gte: Date.now() } })
    if (!coupon) return next(new appError('invalid coupon', 401))
    let cart = await cartModel.findOne({ user: req.user._id })
    if (!cart) return next(new appError('cart not founded', 404))
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount = coupon.discount
    await cart.save() 
    res.send({ message: "success", cart })
})





export{ 
    addToCart,
    removeItemFromCart,
    updateQuantity, 
    getLoggedUserCart,
    clearUserCart,
    applyCoupon
}