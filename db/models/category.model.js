
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true, "name is required"],
        trim:true,
        required:true,
        minLength:[2, "category name is too short"]
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        // required:true,
        ref:"user"
    }
},{
    timestamps:true
})
schema.post('init', function(doc){
    doc.image = process.env.BASE_URL + "uploads/" + doc.image
})
export const categoryModel = mongoose.model("category", schema)