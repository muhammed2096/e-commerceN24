import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from './controller/product.controller.js'
import { addProductVal, paramsIdVal, updateProductVal } from './product.validation.js'
import { uploadFields } from '../../services/fileUpload/fileUploads.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'

const productRouter = express.Router()

productRouter.route("/")
.post(protectedRoutes,allowedTo('admin'), uploadFields([
    {name:"imgCover", maxCount: 1},
    {name:"images", maxCount: 10}
]),validation(addProductVal), addProduct)
.get(getAllProducts)


productRouter.route("/:id")
.get(validation(paramsIdVal), getSingleProduct)
.put(protectedRoutes,allowedTo('admin'),  uploadFields([
    {name:"imgCover", maxCount: 1},
    {name:"images", maxCount: 10}
]),validation(updateProductVal),updateProduct)
.delete(protectedRoutes,allowedTo('admin'),  validation(paramsIdVal),deleteProduct)

export default productRouter