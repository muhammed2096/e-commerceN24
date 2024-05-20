
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { userModel } from "../../../../db/models/user.model.js"


const addToWishlist = catchError(async (req, res, next) => {
    let wishlist = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{wishlist: req.body.product}}, {new:true}).populate('wishlist')
    !wishlist && next(new appError('wishlist not found', 404))
    wishlist && res.send({ message: 'success', wishlist: wishlist.wishlist })
})

const removeFromWishlist = catchError(async (req, res, next) => {
    let wishlist = await userModel.findByIdAndUpdate(req.user._id, {$pull:{wishlist: req.params.id}}, {new:true}).populate('wishlist')
    !wishlist && next(new appError('wishlist not found', 404))
    wishlist && res.send({ message: 'success', wishlist: wishlist.wishlist })
})

const getLoggedUserWishlist = catchError(async (req, res, next) => {
    let {wishlist} = await userModel.findById(req.user._id)
    !wishlist && next(new appError('wishlist not found', 404))
    wishlist && res.send({ message: 'success', wishlist })
})



export{ 
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist 
}