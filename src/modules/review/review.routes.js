import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'
import { addReviewVal, paramsIdVal, updateReviewVal } from './review.validation.js'
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from './controller/review.controller.js'

const reviewRouter = express.Router({mergeParams:true})

reviewRouter.route("/")
.post(protectedRoutes,allowedTo('user'), validation(addReviewVal),addReview)
.get(getAllReviews)


reviewRouter.route("/:id")
.get(validation(paramsIdVal), getSingleReview)
.put(protectedRoutes,allowedTo('user'),  validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user', 'admin'),  validation(paramsIdVal),deleteReview)

export default reviewRouter