// import jwt from "jsonwebtoken"


// const userAuth=async(req,res,next)=>{
//     const token=req.headers.authorization?.split(" ")[1];

//     if(!token){
//         return res.status(401).json({ msg: "Login Please" });
//     }
//     try {
//         const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        
//         if(tokenDecode.id){
//             req.body.userId=tokenDecode.id
//         }else{
//             console.log("Token verification failed");
//             return res.status(401).json({success:false, msg: "Login Please" });
//         }
//         next()
//     } catch (error) {
//         return res.status(401).json({success:false, message: error.message});
//     }
// }

// export default userAuth

import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded info to req
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access" });
    }
};

export default userAuth;