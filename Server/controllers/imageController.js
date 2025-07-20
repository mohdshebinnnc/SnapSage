import UserModel from "../models/userModel.js"
import FormData from "form-data"
import axios from "axios"

export const generateImage=async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        const userId = req.user.id;
        const user=await UserModel.findById(userId)

        if(!user||!prompt){
            return res.status(400).json({success:false,message:"All fields are required!!"})
        }

        if(user.creditBalance===0 || UserModel.creditBalance<0){
            return res.status(400).json({success:false,message:"No Credit Balance",creditBalance:user.creditBalance})
        }

        const formData=new FormData()
        formData.append('prompt',prompt)

        const {data}= await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType:'arraybuffer'
        })

        const base64Image=Buffer.from(data,'binary').toString('base64')
        const resultImage=`data:image/png;base64,${base64Image}`

        await UserModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})
        res.status(201).json({success:true,message:"Image Generated",creditBalance:user.creditBalance - 1,resultImage})

        

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false, message: error.message })
    }
}