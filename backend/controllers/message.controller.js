import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId ,io} from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSideBar=async(req,res)=>{
try {
    const loggedInUser=req.user._id;
    const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password");
    res.status(200).json(filteredUsers);
} catch (error) {
    console.log(error);
    return res.status(500).json({error:"Internal server error"});
}
}

export const getMessages=async(req,res)=>{
  try {
    const {id:userToChatId}=req.params;
    const myId=req.user._id;

    const messages= await Message.find({
        $or:
        [
            {senderId:myId,recieverId:userToChatId},
            {senderId:userToChatId,recieverId:myId}
        ]
    })
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in the  getMessage controller",error);
    res.status(500).json({message:"internal server error"});

  }
}

export const sendMessage=async(req,res)=>{
try {
    const {text,image}=req.body;
    const{id:recieverId}=req.params;
    const senderId=req.user._id;
    let imageUrl;
    if(image){
const uploadResponse=await cloudinary.uploader.upload(image);
 imageUrl= uploadResponse.secure_url;
    }

    const newMessage= new Message({
        senderId,
        recieverId,
        text,
        image:imageUrl
    })
    await newMessage.save();
    //sending  message to online user in realtime.
    const RecieverSocketId=getReciverSocketId(recieverId);
    if(RecieverSocketId){
   io.to(RecieverSocketId).emit("newMessage",newMessage)
}
    return res.status(201).json(newMessage);

} catch (error) {
    console.log("error in sendmessage controller",error);
    return res.status(400).json({error:'error while sending message'});
}

}