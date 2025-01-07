import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import useAuthStore from './useAuthStore'

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUSersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUSersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      toast.error("internal server error:", error);
    } finally {
      set({ isUSersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error("error while loading messages: ", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },


  sendMessage:async(messageData)=>{
const{selectedUser,messages}=get();
try {
    const response=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
    set({messages:[...messages,response.data]})
} catch (error) {
    toast.error("error message not sent:",error)
}
  },

  subscribeToMessages:()=>{
const {selectedUser}=get();
if(!selectedUser) return;

const socket=useAuthStore.getState().socket;

socket.on("newMessage",(newMessage)=>{
  if(newMessage.senderId!==selectedUser._id) return;
  set({
    messages:[...get().messages,newMessage]
  })
})

  },
  unsubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
