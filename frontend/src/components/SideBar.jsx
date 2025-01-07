import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './Skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

function SideBar() {
  const { users = [], selectedUser, isUSersLoading, setSelectedUser, getUsers } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? Array.isArray(users) ? users.filter(user => onlineUsers.includes(user._id)) : []
    : Array.isArray(users) ? users : [];

  if (isUSersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex flex-col h-full transition-all duration-200 border-r lg:w-72 border-base-300">
      <div className="w-full p-5 border-b border-base-300">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">({(onlineUsers.length===0)? "0":onlineUsers.length - 1} online)</span>
      </div>

      <div className="w-full py-3 overflow-y-auto">
        {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center w-full gap-3 p-3 transition-colors hover:bg-base-300
              ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="object-cover rounded-full size-12"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900"></span>
              )}
            </div>
            {/* Only for larger screens */}
            <div className="hidden min-w-0 text-left lg:block">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? 'online' : 'offline'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
