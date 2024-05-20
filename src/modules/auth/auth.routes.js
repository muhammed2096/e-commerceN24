import express from 'express'
import { validation } from '../../middleware/validation.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import { changePassword, protectedRoutes, signin, signup } from './controller/auth.controller.js'
import { changePasswordVal, signinVal, signupVal } from './auth.validation.js'


const authRouter = express.Router()

authRouter.post('/signup', validation(signupVal), checkEmail, signup)
authRouter.post('/signin', validation(signinVal), signin)
authRouter.patch('/changepassword',protectedRoutes, validation(changePasswordVal), changePassword)

export default authRouter