import express from "express" 
import DbConnection from "./db/dbConnection.js"
// require("dotenv").config()
import "dotenv/config"
import cors from "cors";
import userRouter from "./routes/userRoutes.js"

const app=express()
app.use(express.json())
app.use(cors())

DbConnection()

app.use("/api/user",userRouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  http://localhost:${process.env.PORT}`)
})
