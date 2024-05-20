import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addBrandVal, paramsIdVal, updateBrandVal } from './brand.validation.js'
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from './controller/brand.controller.js'
import { uploadSingleField } from '../../services/fileUpload/fileUploads.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'

const brandRouter = express.Router()

brandRouter.route("/")
.post(protectedRoutes,allowedTo('admin'),  uploadSingleField('logo'),validation(addBrandVal), addBrand)
.get(getAllBrands)


brandRouter.route("/:id")
.get(validation(paramsIdVal), getSingleBrand)
.put(protectedRoutes,allowedTo('admin'),  uploadSingleField('logo'),validation(updateBrandVal),updateBrand)
.delete(protectedRoutes,allowedTo('admin'),  validation(paramsIdVal),deleteBrand)

export default brandRouter