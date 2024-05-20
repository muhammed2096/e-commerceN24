import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from './controller/user.controller.js'
import { addUserVal, paramsIdVal, updateUserVal } from './user.validation.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'


const userRouter = express.Router()

userRouter.route("/")
.post(protectedRoutes,allowedTo('admin'),  validation(addUserVal), checkEmail,addUser)
.get(protectedRoutes,allowedTo('admin'),  getAllUsers)


userRouter.route("/:id")
.get(protectedRoutes,allowedTo('admin'),  validation(paramsIdVal), getSingleUser)
.put(protectedRoutes,allowedTo('admin'),  validation(updateUserVal),updateUser)
.delete(protectedRoutes,allowedTo('admin'),  validation(paramsIdVal),deleteUser)

export default userRouter