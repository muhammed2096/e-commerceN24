import slugify from "slugify"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { subCategoryModel } from "../../../../db/models/subCategory.model.js"
import { deleteOne } from "../../handlers/handlers.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"



const addSubCategory = catchError(async (req, res, next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new subCategoryModel(req.body)
    await subCategory.save()
    res.json({message:"Success", subCategory})
}
)
const getAllSubCategories = catchError(async (req, res, next)=>{
    let filterObj = {}
    if(req.params.category){
        filterObj.category = req.params.category
    }
    let apiFeature = new apiFeatures(subCategoryModel.find(filterObj), req.query).fields().pagination().sort().filter().search('name')
    let subCategories = await apiFeature.mongooseQuery
    !subCategories && next(new appError('subCategories not found', 404))
    subCategories && res.send({ message: 'success', page: apiFeature.pageNumber, subCategories })
})

const getSingleSubCategory = catchError(async (req, res, next)=>{
    let subCategory = await subCategoryModel.findById(req.params.id)
    !subCategory && next(new appError("Category not found :(", 404))
    subCategory && res.json({message:"Success", subCategory})
})

const updateSubCategory = catchError(async (req, res, next)=>{
    if(req.body.name) req.body.slug = slugify(req.body.name)
    let subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    !subCategory && next(new appError("Category not found :(", 404))
    subCategory && res.json({message:"Success", subCategory})
})

const deleteSubCategory = deleteOne(subCategoryModel)

export{
    addSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory
}