import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { addToWishlistVal, paramsIdVal } from './wishlist.validation.js'
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from './controller/wishlist.controller.js'

const wishlistRouter = express.Router()

wishlistRouter.route("/")
.patch(protectedRoutes, allowedTo('user'), validation(addToWishlistVal), addToWishlist)
.get(protectedRoutes, allowedTo('user'), getLoggedUserWishlist)


wishlistRouter.route("/:id")
// .get(validation(paramsIdVal) )
// .put(protectedRoutes,allowedTo('user'),  validation(updatewishlistVal))
.delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeFromWishlist)

export default wishlistRouter