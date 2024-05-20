import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSingleSubCategory, updateSubCategory } from './controller/subCategory.controller.js'
import { addSubCategoryVal, paramsIdVal, updateSubCategoryVal } from './subCategory.validation.js'
import { allowedTo, protectedRoutes } from '../auth/controller/auth.controller.js'

const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter.route("/")
.post(protectedRoutes,allowedTo('admin'), validation(addSubCategoryVal),addSubCategory)
.get(getAllSubCategories)


subCategoryRouter.route("/:id")
.get(validation(paramsIdVal), getSingleSubCategory)
.put(protectedRoutes,allowedTo('admin'),  validation(updateSubCategoryVal),updateSubCategory)
.delete(protectedRoutes,allowedTo('admin'),  validation(paramsIdVal),deleteSubCategory)

export default subCategoryRouter