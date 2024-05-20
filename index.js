import dotenv from "dotenv"
dotenv.config({})
import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import { bootstrap } from './src/modules/server.routes.js'
import cors from 'cors'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

dbConnection()

bootstrap(app)

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port ${port}`); 
})