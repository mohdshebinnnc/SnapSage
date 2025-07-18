const express=require("express")
// const DbConnection =require("./db/dbConnection")
require("dotenv").config()
const cors = require("cors");

const app=express()
app.use(express.json())
app.use(cors())

// DbConnection()




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  http://localhost:${process.env.PORT}`)
})
