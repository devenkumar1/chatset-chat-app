import React from 'react';
import { useChatStore } from '../store/useChatStore';
import useAuthStore from '../store/useAuthStore';

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="h-20 p-5 bg-red-600">
      <div className="flex items-center justify-between">
        {/* Profile Info */}
        <div className="flex items-center">
          {/* Profile Image */}
          <img
            src={selectedUser.profilePic}
            alt="User profile"
            className="object-cover w-12 h-12 mr-4 rounded-full"
          />

          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {selectedUser.fullName}
            </h3>
            <span className="text-sm text-zinc-300">
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-xl font-bold text-white bg-transparent border-none"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
