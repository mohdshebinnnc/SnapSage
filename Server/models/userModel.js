import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    creditBalance:{
        type:Number,
        default:5
    }
})

const UserModel=mongoose.models.user || mongoose.model("User",userSchema)
export default UserModel