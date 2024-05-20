
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/handlers.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"
import { reviewModel } from "../../../../db/models/review.model.js"



const addReview = catchError(async (req, res, next)=>{
    req.body.user = req.user._id
    let existReview = await reviewModel.findOne({user: req.user._id, product:req.body.product})
    if(existReview) return next(new appError('you created review before on this product :(', 409))
    let review = new reviewModel(req.body)
    await review.save()
    res.json({message:"Success", review})
}
)
const getAllReviews = catchError(async (req, res, next)=>{ 
    let apiFeature = new apiFeatures(reviewModel.find({}), req.query).fields().pagination().sort().filter().search('name')
    let reviews = await apiFeature.mongooseQuery
    !reviews && next(new appError('reviews not found', 404))
    reviews && res.send({ message: 'success', page: apiFeature.pageNumber, reviews })
})

const getSingleReview = catchError(async (req, res, next)=>{
    let review = await reviewModel.findById(req.params.id)
    !review && next(new appError("review not found :(", 404))
    review && res.json({message:"Success", review})
})

const updateReview = catchError(async (req, res, next)=>{
    let review = await reviewModel.findOneAndUpdate({_id:req.params.id, user:req.user._id}, req.body, {new:true})
    !review && next(new appError("review not found :(", 404))
    review && res.json({message:"Success", review})
})

const deleteReview = deleteOne(reviewModel)

export{
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}