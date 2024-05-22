import slugify from "slugify"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { brandModel } from "../../../../db/models/brand.model.js"
import { deleteOne } from "../../handlers/handlers.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"
import { cloudinaryConfig } from "../../../utils/cloudinaryConfig.js"



const addBrand = catchError(async (req, res, next)=>{
    req.body.slug = slugify(req.body.name)
    let image = await cloudinaryConfig().uploader.upload(req.file.path, {
        folder: 'Ecommerce/brands'
    })
    req.body.logo = image.url 
    let brand = new brandModel(req.body)
    await brand.save() 
    res.json({message:"Success", brand})
})

const getAllBrands = catchError(async (req, res, next)=>{
    let apiFeature = new apiFeatures(brandModel.find({}), req.query).fields().pagination().sort().filter().search('name')
    let brands = await apiFeature.mongooseQuery
    !brands && next(new appError('brands not found', 404))
    brands && res.send({ message: 'success', page: apiFeature.pageNumber, brands })
})

const getSingleBrand = catchError(async (req, res, next)=>{
    let brand = await brandModel.findById(req.params.id)
    !brand && next(new appError("brand not found :(", 404))
    brand && res.json({message:"Success", brand})
})

const updateBrand = catchError(async (req, res, next)=>{
    let updatePhoto = await brandModel.findById(req.params.id)
    if(!updatePhoto) return next(new appError('photo not founded'))
        if (req.file) {
            let publicId = updatePhoto.imageCover.split('/').pop().split('.')[0]
            console.log(publicId);
            await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
    
            let image = await cloudinaryConfig().uploader.upload(req.file.path, {
                folder: 'Ecommerce/brands'
            })
            req.body.logo = image.url
        } 
    if(req.body.name) req.body.slug = slugify(req.body.name)
    let brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    !brand && next(new appError("brand not found :(", 404))
    brand && res.json({message:"Success", brand})
})

const deleteBrand = deleteOne(brandModel)

export{
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand
}