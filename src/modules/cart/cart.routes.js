import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from './controller/cart.controller.js'
import { addToCartVal, paramsIdVal, updateQTYVal } from './cart.validation.js'

const cartRouter = express.Router()

cartRouter.route("/")
.post(protectedRoutes, allowedTo('user'), validation(addToCartVal), addToCart)
.get(protectedRoutes, allowedTo('user'), getLoggedUserCart)
.delete(protectedRoutes, allowedTo('user'), clearUserCart)

cartRouter.post("/applycoupon", protectedRoutes, allowedTo('user'), applyCoupon)

cartRouter.route("/:id")
.delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeItemFromCart)
.put(protectedRoutes, allowedTo('user'), validation(updateQTYVal), updateQuantity)
// .get(protectedRoutes, allowedTo('user'), validation(paramsIdVal), getLoggedUserCart)

export default cartRouter