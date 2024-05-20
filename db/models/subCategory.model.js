

import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true, "name is required"],
        trim:true,
        required:true,
        minLength:[2, "subcategory name is too short"]
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"category"
    }
},{
    timestamps:true
})
schema.pre('find', function(){
    this.populate('category')
})
export const subCategoryModel = mongoose.model("subcategory", schema)