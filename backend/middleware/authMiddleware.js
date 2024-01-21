import pkg from 'jsonwebtoken';
const { verify } = pkg;
import User from '../models/User.js';
export const authGuard = async (req,res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
   try{
        const token = req.headers.authorization.split(" ")[1];
        const {id} = verify(token,process.env.JWT_TOKEN);
        req.user = await User.findById(id).select("-password");
        next();
   } catch(error){
    let err = new Error("Not authorized, Token fail")
    err.statusCode = 401
    next(err)
   }
    } else {
        let error = new Error("Not authorized")
        error.statusCode = 401
        next(error)
    }
}

export const admin = (req,res,next)=>{
    if(req.user && req.user.admin){
        next()
    } else {
        let error = new Error("Not authorized as an admin")
        error.statusCode=401;
        next(error);
    }
}