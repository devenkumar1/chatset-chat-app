import React from 'react'
import {useChatStore} from '../store/useChatStore.js'
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import SideBar from '../components/SideBar.jsx';

function HomePage() {
  const {selectedUser}=useChatStore();

  return (
    <div className='h-screen text-white bg-base-200'>
      <div className='flex items-center justify-center px-4 pt-20'>
      <div className='w-full p-2 rounded-lg bg-base-100 shadow-cl h-[calc(100vh-8rem)] '>
        <div className='flex w-full h-full overflow-hidden rounded-lg '>
          <SideBar/>
          {!selectedUser? <NoChatSelected/>:<ChatContainer/>}
        </div>
        </div>  
      </div>
      </div>
  )
}

export default HomePage