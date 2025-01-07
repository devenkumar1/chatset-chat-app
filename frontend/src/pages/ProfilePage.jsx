import React, { useState } from 'react';
import { Edit, LogOut, Mail, Camera, User2Icon } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProfilePage() {
  const { authUser, logout, isUpdatingProfile, updateProfile } = useAuthStore();
  const navigate = useNavigate();

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 pt-20 bg-[#F5F5F5]">
      <h1 className="text-4xl text-yellow-400">Profile</h1>
      <h2 className="text-2xl text-gray-800">Your profile information</h2>
      <div className="w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center py-8 text-white bg-primary">
          {/* Full-size preview above the profile pic */}
          {isPreviewVisible && (
            <div className="absolute z-10 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
              <img
                src={
                  authUser.profilePic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Profile Preview"
                className="object-cover w-[300px] h-[300px] rounded-lg"
              />
              <button
                className="mt-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                onClick={() => setIsPreviewVisible(false)}
              >
                Close Preview
              </button>
            </div>
          )}

          {/* Circular Profile Picture */}
          <div
            className="relative w-24 h-24 cursor-pointer"
            onClick={() => setIsPreviewVisible(true)}
          >
            <img
              src={
                authUser.profilePic ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
              loading="lazy"
            />
            <label
              htmlFor="upload-image"
              className="absolute bottom-0 right-0 p-1 bg-gray-800 rounded-full cursor-pointer"
            >
              <Camera className="text-white size-4" />
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                className="hidden"
                disabled={isUpdatingProfile}
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="text-[10px] font-semibold text-gray-800">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the profile picture to preview"}
          </p>
          <h1 className="mt-4 text-2xl font-bold">{authUser?.fullName}</h1>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <User2Icon className="text-primary size-6" />
              <div>
                <h2 className="font-sans text-sm font-medium">Full Name:</h2>
                <p className="font-bold text-base-content/60">
                  {authUser?.fullName}
                </p>
              </div>
            </div>
          </div>
          <br />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="text-primary size-6" />
              <div>
                <h2 className="font-sans text-sm font-medium">Email</h2>
                <p className="font-bold text-base-content/60">{authUser?.email}</p>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <div>
            <h2 className="text-base font-bold">Account details:</h2>
            <h3>
              Member Since:
              <span className="text-blue-300">
                {" "}
                {authUser.createdAt?.split("T")[0]}
              </span>
            </h3>
            <h3>
              Account Status: <span className="text-green-500">Active</span>
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between px-6 py-4 bg-gray-100">
          <button
            className="flex items-center gap-2 btn btn-outline"
            onClick={() => navigate('/edit-profile')}
          >
            <Edit className="size-5" />
            Edit Profile
          </button>
          <button
            className="flex items-center gap-2 btn btn-error"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
