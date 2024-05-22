import slugify from "slugify"
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { productModel } from "../../../../db/models/product.model.js"
import { deleteOne } from "../../handlers/handlers.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"




const addProduct = catchError(async (req, res, next)=>{
    req.body.slug = slugify(req.body.title)
    const coverImageResult = await cloudinaryConfig().uploader.upload(req.files.imageCover[0].path, {
        folder: 'Ecommerce/product/coverimage',
    });
    const uploadPromises = req.files.images.map(async (file) => {
        const result = await cloudinaryConfig().uploader.upload(file.path, {
            folder: 'Ecommerce/product/images',
        });
        return result.url;
    });
    const images = await Promise.all(uploadPromises);
    req.body.imgCover = coverImageResult.url;
    req.body.images = images;
    let product = new productModel(req.body)
    await product.save() 
    res.json({message:"Success", product})
})

const getAllProducts = catchError(async (req, res, next)=>{
    let apiFeature = new apiFeatures(productModel.find({}), req.query).fields().pagination().sort().filter().search('title', 'description')
    let products = await apiFeature.mongooseQuery
    !products && next(new appError('Product not found', 404))
    products && res.send({ message: 'success', page: apiFeature.pageNumber, products })
})

const getSingleProduct = catchError(async (req, res, next)=>{
    let product = await productModel.findById(req.params.id)
    !product && next(new appError("product not found :(", 404))
    product && res.json({message:"Success", product})
})

const updateProduct = catchError(async (req, res, next)=>{
    if(req.body.title) req.body.slug = slugify(req.body.title)
        let productImg = await productModel.findById(req.params.id)
    if (req.body.title) req.body.slug = slugify(req.body.title)
    if (req.file) {
        let publicId = productImg.imgCover.split('/').pop().split('.')[0]
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path, {
            folder: 'Ecommerce/product'
        })
        req.body.imgCover = image.url
    } 
    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    !product && next(new appError("product not found :(", 404))
    product && res.json({message:"Success", product})
})

const deleteProduct = deleteOne(productModel)

export{
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}