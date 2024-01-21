import Comments from "../models/Comments.js"
import Post from "../models/Posts.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export const createComment = async (req,res,next)=>{
    try{
        const {description,slug,parent,replyOnUser,check}= req.body;

        const post = await Post.findOne({slug:slug})
        if(!post){
            let err = new Error("Post not found")
            return next(err);
        }
        const newComment = new Comments({
            user:req.user._id,
            description,
            post:post._id,
            check,
            parent,
            replyOnUser,
        })
        const createdComment = await newComment.save()
        return res.json(createdComment)
    } catch(error){
        next(error);
    }
}

export const deleteComment = async (req,res,next) => {
    try {
        const comment1 = await Comments.findByIdAndDelete(req.params.commentId)
        if(!comment1){
          let err = new Error("Comment was not found")
          return next(err);
        }
        return res.json({
          message:"Comment is successfully deleted"
        })
      } catch(error){
        console.log(error)
        next(error)
      }
}

export const updateComment = async (req,res,next) => {
  try{
    const {description}=req.body;
    const comment = await Comments.findById(req.params.commentId);
    if(!comment){
      const err = new Error("Comment was not found")
      return next(err)
    }
    comment.description = description || comment.description;
    const updateComment = await comment.save()
    return res.json(updateComment)
  } catch(error){
    console.log(error)
    next(error)
  }
}

