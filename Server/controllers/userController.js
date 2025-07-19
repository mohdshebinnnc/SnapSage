import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if (!name||!email||!password){
            return res.status(400).json({error:"All fields are required!!"})
        }

        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({ error: "Email already in use!" })
        }

        const hashedPassword=await bcrypt.hash(password,10)
        JWT_SECRET
        const newUser=new UserModel({name,email,password:hashedPassword})
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(201).json({message: "User registered successfully!",token,
            user:{
                name:user.name,
                email:user.email,
                password:user.password
            }
        })

        // res.status(201).json({message:"User regitered successfully!",userId:newUser._id})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error. Please try again later." })
    }
}

export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
            res.status(200).json({success:true,token,
                user:{
                    name:user.name,
                    email:user.email,
                    password:user.password
                }
            })
        }else{
            return res.status(401).json({ error: "Invalid credentials!" });
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error. Please try again later." })
    }
}

export const userCredits=async(req,res)=>{
    try {
        const {userId}=req.body
        const user=await UserModel.findById(userId)

        res.status(201).json({success:true,credits:user.creditBalance,
            user:{
                name:user.name,
                email:user.email,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error. Please try again later." })
    }
}
