import mongoose from "mongoose";

export const dbConnection =()=> {
    mongoose.connect(process.env.DB_ONLINE)
    .then(()=>{console.log("DB is Connected");})
    .catch((err)=>{console.log("database error",err);}) 
} 