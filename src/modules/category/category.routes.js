import express from 'express'
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from './controller/category.controller.js'
import { validation } from '../../middleware/validation.js'
import { addCategoryVal, paramsIdVal, updateCategoryVal } from './category.validation.js'
import { uploadSingleField } from '../../services/fileUpload/fileUploads.js'
import subCategoryRouter from '../subCategory/subCategory.routes.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'


const categoryRouter = express.Router()

categoryRouter.use('/:category/subcategories', subCategoryRouter)

categoryRouter.route("/")
.post(protectedRoutes, allowedTo('admin'), uploadSingleField('img'),validation(addCategoryVal),addCategory)
.get(getAllCategories)


categoryRouter.route("/:id")
.get(validation(paramsIdVal), getSingleCategory)
.put(protectedRoutes,allowedTo('admin'),  uploadSingleField('img'),validation(updateCategoryVal),updateCategory)
.delete(protectedRoutes,allowedTo('admin'),  validation(paramsIdVal),deleteCategory)

export default categoryRouter