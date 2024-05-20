import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { addAddressVal, paramsIdVal } from './adress.validation.js'
import { addAddress, getLoggedUserAddress, removeAddress } from './controller/adress.controller.js'

const addressRouter = express.Router()

addressRouter.route("/")
.patch(protectedRoutes, allowedTo('user'), validation(addAddressVal), addAddress)
.get(protectedRoutes, allowedTo('user'), getLoggedUserAddress)


addressRouter.route("/:id")
.delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeAddress)

export default addressRouter