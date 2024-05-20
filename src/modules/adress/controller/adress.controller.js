
import { catchError } from "../../../middleware/catchError.js"
import { appError } from "../../../utils/appError.js"
import { userModel } from "../../../../db/models/user.model.js"


const addAddress = catchError(async (req, res, next) => {
    let address = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{address: req.body}}, {new:true})
    !address && next(new appError('address not found', 404))
    address && res.send({ message: 'success', address: address.address })
})

const removeAddress = catchError(async (req, res, next) => {
    let address = await userModel.findByIdAndUpdate(req.user._id, {$pull:{address: {_id:req.params.id}}}, {new:true})
    !address && next(new appError('address not found', 404))
    address && res.send({ message: 'success', address: address.address })
})

const getLoggedUserAddress = catchError(async (req, res, next) => {
    let {address} = await userModel.findById(req.user._id)
    !address && next(new appError('address not found', 404))
    address && res.send({ message: 'success', address })
})



export{ 
    addAddress,
    removeAddress,
    getLoggedUserAddress 
}