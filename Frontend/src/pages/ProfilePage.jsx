import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {
  GetProfileAPI,
  UpdateProfileAPI,
  ChangePasswordAPI,
  DeleteAccountAPI,
} from "../api/ProfileAPI";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [deletePassword, setDeletePassword] = useState("");

  const [showPasswordBox, setShowPasswordBox] = useState(false);

  useEffect(() => {
    GetProfileAPI().then((res) => {
      if (res.success) {
        setUser(res.user);
        setUsername(res.user.username);
        setName(res.user.name);
      }
    });
  }, []);

  const updateProfile = async () => {
    const isSame =
      username === user.username && name === user.name;

    if (isSame) {
      alert("No changes made");
      return;
    }

    const res = await UpdateProfileAPI({
      username,
      name,
    });

    if (!res.success) {
      alert(res.msg || "Update failed");
      return;
    }

    alert("Profile updated successfully");

    setUser(res.user);
  };

  const updatePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill both fields");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const res = await ChangePasswordAPI(oldPassword, newPassword);

    if (!res.success) {
      alert(res.msg || "Password update failed");
      return;
    }

    alert("Password updated successfully");

    setOldPassword("");
    setNewPassword("");
    setShowPasswordBox(false);
  };


  const deleteAccount = async () => {
    if (!deletePassword) {
      alert("Enter your password");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure? This action cannot be undone."
    );

    if (!confirmDelete) return;

    const res = await DeleteAccountAPI({
        password: deletePassword,
      });

    if (!res.success) {
      alert(res.msg || "Failed to delete account");
      return;
    }

    alert("Account deleted successfully");

    window.location.href = "/";
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-bgclr flex items-center justify-center text-white">
          Loading Profile...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bgclr py-8 px-4">
        <div className="max-w-2xl mx-auto bg-navbgclr border border-white/10 rounded-xl p-6">

          <h1 className="text-2xl font-bold text-white mb-8 text-center">
            My Profile
          </h1>

          <div className="space-y-5 w-full max-w-md mx-auto">

            <div>

              <label className="text-gray-400 text-sm">Username</label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transition"
              />

            </div>

            <div>
              <label className="text-gray-400 text-sm">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transition"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <input
                value={user.email}
                disabled
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
              />
            </div>

            <button
              onClick={updateProfile}
              className="w-full border border-[#00e6e6] text-[#00e6e6] py-3 rounded-lg font-bold hover:bg-[#00e6e6] hover:text-black"
            >
              Save Profile
            </button>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 max-w-md mx-auto">

            <button
              onClick={() => setShowPasswordBox(!showPasswordBox)}
              className="w-full border border-[#00e6e6] text-[#00e6e6] py-3 rounded-lg font-bold  hover:bg-[#00e6e6] hover:text-black"
            >
              {showPasswordBox ? "Cancel" : "Change Password"}
            </button>

            {showPasswordBox && (
              <div className="mt-5 space-y-4">

                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transition"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transition"
                />

                <button
                  onClick={updatePassword}
                  className="w-full border border-[#00e6e6] text-[#00e6e6] py-3 rounded-lg font-bold hover:bg-[#00e6e6] hover:text-black"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>

          {/* <div className="mt-10 border-t border-gray-800 pt-6 max-w-md mx-auto">

            <input
              type="password"
              placeholder="Enter password to delete account"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transitio mb-4"
            />

            <button
              onClick={deleteAccount}
              className="w-full border border-red-500 text-red-500 py-3 rounded-lg font-bold hover:bg-red-500 hover:text-white"
            >
              Delete Account
            </button>

          </div> */}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;