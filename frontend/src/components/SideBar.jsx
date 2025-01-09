import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

function SideBar() {
  const { users = [], selectedUser, isUSersLoading, setSelectedUser, getUsers } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? Array.isArray(users)
      ? users.filter((user) => onlineUsers.includes(user._id))
      : []
    : Array.isArray(users)
    ? users
    : [];

  if (isUSersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex flex-col w-32 h-full overflow-hidden transition-all duration-200 border-r border-base-300 lg:w-64 md:w-48 sm:w-40">
    {/* Header Section */}
    <div className="w-full p-2 border-b sm:p-2 border-base-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span className="hidden text-sm font-medium lg:block">Contacts</span>
        </div>
        <label className="flex flex-wrap items-center gap-1">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-xs">online only</span>
        </label>
      </div>
      <span className="block mt-1 text-xs text-zinc-500">
        ({onlineUsers.length === 0 ? "0" : onlineUsers.length - 1} online)
      </span>
    </div>
  
    {/* Users List */}
    <div className="flex-1 w-full py-2 overflow-y-auto">
      {Array.isArray(filteredUsers) &&
        filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-2 p-2 transition-colors hover:bg-base-300
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            {/* Profile Picture */}
            <div className="relative w-8 h-8 sm:w-7 sm:h-7">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="object-cover w-full h-full rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"></span>
              )}
            </div>
  
            {/* User Details */}
            <div className="flex flex-col flex-1 w-full text-left">
              <div className="text-xs font-medium ">
                {user.fullName}
              </div>
              <div className="text-xs text-zinc-400">
                {onlineUsers.includes(user._id) ? "online" : "offline"}
              </div>
            </div>
          </button>
        ))}
    </div>
  </aside>
  

  );
}

export default SideBar;
