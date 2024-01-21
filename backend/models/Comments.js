import { Schema,model } from "mongoose";


const commentSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    description:{type:String,required:true},
    post:{type:Schema.Types.ObjectId,ref:"Post",required:true},  
    check:{type:Boolean,default:false},
    parent:{type:Schema.Types.ObjectId,ref:"Comments",default:null},
    replyOnUser:{type:Schema.Types.ObjectId,ref:"User",default:null},
    
},
{timestamps:true,toJSON:{virtuals:true}}
);

commentSchema.virtual('replies',{
    ref:"Comments",
    localField:"_id",
    foreignField:'parent',
    
   })



const Comments = model("Comments",commentSchema);
export default Comments;