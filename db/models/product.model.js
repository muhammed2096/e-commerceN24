

import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true, "title is required"],
        trim:true,
        required:true,
        minLength:[2, "product title is too short"],
        maxLength:[200, "product title is too long"]
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },    
    description:{
        type:String,
        trim:true,
        required:true,
        minLength:[10, "description is too short"],
        maxLength:[500, "description is too long"]
    },
    imgCover:String,
    images:[],
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true
    },
    quantity:{
        type:Number,
        min:0,
        default:0 
    },
    sold:Number,
    rateAvg:{
        type:Number,
        max:5,
        min:0
    },
    rateCount:{
        type:Number,
        min:0,
        default:0
    },
    category:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"category"
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"subcategory"
    },
    brand:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"brand"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        // required:true,
        ref:"user"
    }
},{
    timestamps:true, toJSON:{virtuals:true}
})
schema.post('init', function(doc){
    if(doc.imgCover || doc.images)
    doc.imgCover = process.env.BASE_URL + "uploads/" + doc.imgCover
    doc.images = doc.images?.map((img)=> process.env.BASE_URL + "uploads/" + img)
})
schema.virtual('myReviews', {
    ref:'review',
    localField:'_id',
    foreignField:'product',
})
schema.pre('findOne', function(){
    this.populate('myReviews')
})
export const productModel = mongoose.model("product", schema)