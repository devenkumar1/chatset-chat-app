
import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './Skeletons/MessageSkeleton';
import MessageInput from './MessageInput';
import useAuthStore from '../store/useAuthStore';

function ChatContainer() {
  const { isMessagesLoading, messages, selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto bg-gray-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-gray-50 ">
      <ChatHeader />
      <div className="flex flex-col space-y-6 overflow-y-auto bg-gray-100 lg:p-4 sm:2">
        {messages.map((message) => (
          <div
            key={message._id}
            ref={messageEndRef}
            className={`flex items-start lg:space-x-3 sm:space-x-1 my-1 ${message.senderId === authUser._id ? 'justify-end' : 'justify-start'
              }`}
          >
            {/* Avatar */}
            <div className={`lg:w-10 w-8 h-8 lg:h-10 ${message.senderId === authUser._id ? 'order-2' : ''}`}>
              <img
                className="w-8 h-8 border border-gray-300 rounded-full lg:w-10 lg:h-10"
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic
                    : selectedUser.profilePic
                }
                alt="profile"
              />
            </div>

            {/* Message Content */}
            <div
              className={`max-w-xs px-4 py-2 text-sm text-gray-800 bg-white rounded-lg shadow-md ${message.senderId === authUser._id ? 'bg-blue-100' : 'bg-white'
                }`}
            >
              {message.image && (
                <div className="border border-blue-500">
                  <img src={message.image} alt="message" />
                </div>
              )}
              <p>{message.text}</p>
              <time className="block mt-1 text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />

    </div>
  );
}

export default ChatContainer;
