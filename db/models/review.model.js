import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        minLength:[2, "review text is too short"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    },
    product:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"product"
    },
    rate:{
        type:Number,
        max:5,
        min:0
    }
},{
    timestamps:true
})

schema.pre(/^find/, function(){
    this.populate('user', 'name')
})

export const reviewModel = mongoose.model("review", schema)