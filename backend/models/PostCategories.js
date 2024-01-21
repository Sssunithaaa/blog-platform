import { Schema,model } from "mongoose";


const categoriesSchema = new Schema({
    title:{type:String,required:true,default:''},

},
{timestamps:true}
);




const PostCategories = model("PostCategories",categoriesSchema);
export default PostCategories;