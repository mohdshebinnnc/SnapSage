import jwt from "jsonwebtoken"


const userAuth=async(req,res,next)=>{
    const token=req.headers.token;

    if(!token){
        return res.status(401).json({ msg: "Login Please" });
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id
        }else{
            console.log("Token verification failed");
            return res.status(401).json({success:false, msg: "Login Please" });
        }
        next()
    } catch (error) {
        return res.status(401).json({success:false, message: error.message});
    }
}

export default userAuth