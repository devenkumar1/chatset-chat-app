import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
{
email:{
    type:String,
    required:true,
    unique:true,
},
fullName:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
    minlenght:6
},
profilePic:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
}

},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;

