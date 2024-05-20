import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:[3, "user name is too short"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user',
        lowercase:true
    },
    passwordChangedAt:Date,
    wishlist:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
    address:[{
        street:String,
        phone:String,
        city:String,
        zip:Number
    }]
},{
    timestamps:true
})
schema.pre('save',function(){
   if(this.password) this.password = bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})
// schema.pre('findOneAndUpdate', function(){
//     this.populate('wishlist')
// })
export const userModel = mongoose.model("user", schema)