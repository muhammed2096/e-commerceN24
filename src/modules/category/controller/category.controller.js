import slugify from "slugify"
import { categoryModel } from "../../../../db/models/category.model.js"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/handlers.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"



const addCategory = catchError(async (req, res, next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename  
    req.body.user = req.user._id
    let category = new categoryModel(req.body)
    await category.save()
    res.json({message:"Success", category})
}
)
const getAllCategories = catchError(async (req, res, next)=>{
    let apiFeature = new apiFeatures(categoryModel.find({}), req.query).fields().pagination().sort().filter().search('name')
    let categories = await apiFeature.mongooseQuery
    !categories && next(new appError('categories not found', 404))
    categories && res.send({ message: 'success', page: apiFeature.pageNumber, categories })
})

const getSingleCategory = catchError(async (req, res, next)=>{
    let category = await categoryModel.findById(req.params.id)
    !category && next(new appError("Category not found :(", 404))
    category && res.json({message:"Success", category})
})

const updateCategory = catchError(async (req, res, next)=>{
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename    
    let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    !category && next(new appError("Category not found :(", 404))
    category && res.json({message:"Success", category})
})

const deleteCategory = deleteOne(categoryModel)

export{
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}