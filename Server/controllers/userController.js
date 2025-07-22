import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay"
import TransactionModel from "../models/transactionModel.js";


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
        
        const newUser=new UserModel({name,email,password:hashedPassword})
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(201).json({message: "User registered successfully!",token,
            user:{
                name:user.name,
                email:user.email
            }
        })

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

// export const userCredits=async(req,res)=>{
//     try {
//         const {userId}=req.body
//         const user=await UserModel.findById(userId)

//         res.status(201).json({success:true,credits:user.creditBalance,
//             user:{
//                 name:user.name,
//                 email:user.email,
//             }
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: "Server error. Please try again later." })
//     }
// }
export const userCredits = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({
            success: true,
            credits: user.creditBalance,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// const razorpayInstance=new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET
// })

export const paymentRazorpay=async(req,res)=>{
    try {
        const {userId,planId}=req.body
        const userData=await UserModel.findById(userId)

        if(!userId || !planId){
            return res.status(400).json({error:"All fields are required!!"})
        }

        let credits, plan, amount, date

        switch (planId) {
            case "Basic":
                plan="Basic"
                credits=100
                amount=500
                break;

            case "Advanced":
                plan="Advanced"
                credits=500
                amount=1500
                break;

            case "Business":
                plan="Business"
                credits=5000
                amount=4000
                break;
        
            default:
                return res.status(401).json({ success: false, message: "Plan not found" })
        }

        date = Date.now()

        const transactionData={
            userId, credits, plan, amount, date
        }
        const newTransaction=await TransactionModel.create(transactionData)

        const options={
            amount:amount*100,
            currency:process.env.CURRENCY,
            reciept:newTransaction._id,

        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.status(401).json({success:false,message:error})
            }
            res.status(201).json({success:true, order})
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({success:false,message:error.message})
    }
}
