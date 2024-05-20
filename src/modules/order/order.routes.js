import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { createCashOrder, createCheckOutSession, getAllOrders, getSpecificOrder } from './controller/order.controller.js'
import { createOrderVal, paramsIdVal } from './order.validation.js'


const orderRouter = express.Router()

orderRouter.route("/")
.post(protectedRoutes, allowedTo('user'), validation(createOrderVal), createCheckOutSession)
// .get(protectedRoutes, allowedTo('user'), getLoggedUserCart)
// .delete(protectedRoutes, allowedTo('user'), clearUserCart)
.get(protectedRoutes, allowedTo('user'), getSpecificOrder)

orderRouter.get('/allorders', protectedRoutes, allowedTo('admin'), getAllOrders)
orderRouter.post('/checkout/:id', protectedRoutes, allowedTo('user'), validation(createOrderVal), createCheckOutSession)

orderRouter.route("/:id")
.post(protectedRoutes, allowedTo('user'), validation(createOrderVal), createCashOrder)
// .put(protectedRoutes, allowedTo('user'), validation(updateQTYVal), updateQuantity)


export default orderRouter