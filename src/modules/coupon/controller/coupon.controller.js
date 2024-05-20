
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/handlers.js"
import { apiFeatures } from "../../../utils/apiFeatures.js"
import { couponModel } from "../../../../db/models/coupon.model.js"




const addCoupon = catchError(async (req, res, next)=>{
    let existCoupon = await couponModel.findOne({code: req.body.code})
    if(existCoupon) return next(new appError('you created this coupon before :(', 409))
    let coupon = new couponModel(req.body)
    await coupon.save()
    res.json({message:"Success", coupon})
}
)
const getAllCoupons = catchError(async (req, res, next)=>{ 
    let apiFeature = new apiFeatures(couponModel.find({}), req.query).fields().pagination().sort().filter().search('name')
    let coupons = await apiFeature.mongooseQuery
    !coupons && next(new appError('coupons not found', 404))
    coupons && res.send({ message: 'success', page: apiFeature.pageNumber, coupons })
})

const getSingleCoupon = catchError(async (req, res, next)=>{
    let coupon = await couponModel.findById(req.params.id)
    !coupon && next(new appError("coupon not found :(", 404))
    coupon && res.json({message:"Success", coupon})
})

const updateCoupon = catchError(async (req, res, next)=>{
    let coupon = await couponModel.findOneAndUpdate({_id:req.params.id, user:req.user._id}, req.body, {new:true})
    !coupon && next(new appError("coupon not found :(", 404))
    coupon && res.json({message:"Success", coupon})
})

const deleteCoupon = deleteOne(couponModel)

export{
    addCoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon
}