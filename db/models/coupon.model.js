
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true,
        unique:[true, 'code is required']
    },
    expires:Date,
    discount:Number,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
    
},{
    timestamps:true
})

export const couponModel = mongoose.model("coupon", schema)