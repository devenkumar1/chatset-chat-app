import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from'socket.io-client'
const BASE_URL= import.meta.env.Mode ==="development" ? "http://localhost:5003/api":"/"
const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile:false,
  onlineUsers: [],
  socket:null,


  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup:async(data)=>{
    try {
      set({isSigningUp:true});
    const response=  await axiosInstance.post("/auth/signup",data);
    set({authUser:response.data});
    toast.success("Account created succesfully");
    get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({isSigningUp:false});
    }
  },
  logout:async()=>{
    try {
     const response= await axiosInstance.post("/auth/logout");
      set({authUser:null});
      toast.success("logged out succesfully");
    } catch (error) {
      toast.error(error.respone.data.message);
    }

  },
  login:async(data)=>{
try {
  set({isLoggingIn:true});
    const response= await axiosInstance.post("/auth/login",data);
    console.log(response.data)
    set({authUser:response.data});
    toast.success("Logged in succesfully");
    get().connectSocket();

} catch (error) {
  toast.error("wrong credentials");
}finally{
  set({isLoggingIn:false});
}
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/updateprofile", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateProfile:", error);
      toast.error("Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
 connectSocket: ()=>{
  const {authUser}=get();
  if(!authUser || get().socket?.connected) return
  const socket=io(BASE_URL,{
    query:{
      userId:authUser._id
    }}
  )
  socket.connect();
  set({socket:socket})
  socket.on("getOnlineUsers",(userIds)=>{
    set({onlineUsers:userIds})
    
  })
 },
 disconnectSocket:()=>{
  if(get().socket?.connected) get().socket.disconnect();
 }
}));

export default useAuthStore;
