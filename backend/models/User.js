import { Schema,model } from "mongoose";
import { hash,compare} from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const userSchema = new Schema({
    avatar:{type:String,default:''},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    verified:{type:Boolean,default:false},
    verificationCode:{type:String,required:false},
    admin:{type:Boolean,default:false
    }
},
{timestamps:true,toJSON:{virtuals:true}}
);

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await hash(this.password,10);
        return next()
    }
    return next()
})

userSchema.methods.generateJWT = async function () {
    return await sign({id:this._id},process.env.JWT_TOKEN,{expiresIn:'30d'})
}

//returns a promise
//So we need to await for it
userSchema.methods.verifyPassword = async function (oopassword) {
    return await compare(oopassword, this.password);
};

userSchema.virtual("Post",{
    ref:"Post",
    localField:"_id",
    foreignField:"user"
})

const User = model("User",userSchema);
export default User;