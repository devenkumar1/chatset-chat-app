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
    <aside className="flex flex-col h-full transition-all duration-200 border-r border-base-300 lg:w-72 w-60 sm:w-24">
      {/* Header Section */}
      <div className="w-full p-4 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="hidden font-medium lg:block">Contacts</span>
          </div>
          <label className="flex flex-col items-center gap-2 lg:flex-row">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm lg:text-xs">Show online only</span>
          </label>
        </div>
        <span className="block mt-1 text-xs text-zinc-500 lg:mt-0">
          ({onlineUsers.length === 0 ? "0" : onlineUsers.length - 1} online)
        </span>
      </div>

      {/* Users List */}
      <div className="flex-1 w-full py-3 overflow-y-auto">
        {Array.isArray(filteredUsers) &&
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 transition-colors hover:bg-base-300
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }
              `}
            >
              {/* Profile Picture */}
              <div className="relative w-10 h-10 sm:w-8 sm:h-8">
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="object-cover w-full h-full rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-2 h-2 sm:w-1.5 sm:h-1.5 ring-2 ring-white"></span>
                )}
              </div>

              {/* User Details */}
              <div className="flex flex-col w-full text-left">
                <div className="text-sm font-medium truncate sm:text-xs">
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
