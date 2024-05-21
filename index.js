import dotenv from "dotenv"
dotenv.config({})
import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import { bootstrap } from './src/modules/server.routes.js'
import cors from 'cors'
import { createOnlineSesssion } from "./src/modules/order/controller/order.controller.js"
const app = express()
const port = 3000
app.use(cors())
app.post('/webhook', express.raw({type: 'application/json'}), createOnlineSesssion);
app.use(express.json())
app.use('/uploads',express.static('uploads'))
dbConnection()

  
  

bootstrap(app)

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port ${port}`); 
}) 