import express from "express";
import dotenv from "dotenv";
import db from './config/db.js';
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler.js";
// Routes
import userRoutes from './routes/userRoutes.js'
import cors from "cors"
import postRoutes from  './routes/postRoutes.js'
import commentRoutes from "./routes/commentRoutes.js"
dotenv.config()
db()
const app=express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Server is running")
});
app.use('/uploads',express.static('uploads'))
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments',commentRoutes)
app.use(invalidPathHandler)
app.use(errorResponseHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})