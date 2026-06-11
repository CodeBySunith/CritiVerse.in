import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import {
  GetProfileAPI,
  UpdateProfileAPI,
  ChangePasswordAPI,
  DeleteAccountAPI
} from '../api/ProfileAPI'

const Profile = () => {

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [showPasswordBox, setShowPasswordBox] = useState(false)

  useEffect(() => {

    GetProfileAPI().then((res) => {

      if (res.success) {

        setUser(res.user)
        setUsername(res.user.username)
        setName(res.user.name)

      }

    })

  }, [])

  const updateProfile = async () => {

    const res = await UpdateProfileAPI({
      username,
      name
    })

    alert(res.msg || 'Profile Updated')

  }

  const updatePassword = async () => {

    const res = await ChangePasswordAPI(
      oldPassword,
      newPassword
    )

    alert(res.msg)

    if (res.success) {

      setOldPassword('')
      setNewPassword('')
      setShowPasswordBox(false)

    }

  }

  const deleteAccount = async () => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account permanently?'
    )

    if (!confirmDelete) return

    const res = await DeleteAccountAPI()

    alert(res.msg)

    if (res.success) {

      window.location.href = '/'

    }

  }

  if (!user) {

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-bgclr flex items-center justify-center text-white text-lg">
          Loading Profile...
        </div>

        <Footer />
      </>
    )

  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bgclr py-8 sm:py-10 px-4">

        <div className="max-w-2xl mx-auto bg-navbgclr border border-white/10 rounded-xl p-5 sm:p-8 flex flex-col items-center">

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            My Profile
          </h1>


          <div className="flex flex-col items-center mb-8">

            <img
              src={user.avatarURL}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#00e6e6]"
            />

            <p className="text-gray-400 text-sm mt-3 text-center">
              Profile image cannot be edited
            </p>

          </div>


          <div className="space-y-5 w-full max-w-md">

            <div>

              <label className="block text-gray-400 text-sm mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6]"
              />

            </div>

            <div>

              <label className="block text-gray-400 text-sm mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6]"
              />

            </div>

            <div>

              <label className="block text-gray-400 text-sm mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
              />

            </div>

            <button
              onClick={updateProfile}
              className="w-full bg-transparent border border-[#00e6e6] text-[#00e6e6] py-3 rounded-lg font-bold transition-all duration-300 hover:bg-[#00e6e6] hover:text-[#1a1e24]"
            >
              Save Profile
            </button>

          </div>


          <div className="mt-10 pt-8 border-t border-gray-800 w-full max-w-md">

            <button
              onClick={() => setShowPasswordBox(!showPasswordBox)}
              className="w-full bg-transparent border border-[#00e6e6] text-[#00e6e6] py-3 rounded-lg font-bold transition-all duration-300 hover:bg-[#00e6e6] hover:text-[#1a1e24]"
            >
              {showPasswordBox
                ? 'Cancel Password Change'
                : 'Change Password'}
            </button>

            {showPasswordBox && (

              <div className="mt-5 space-y-4">

                <div>

                  <label className="block text-gray-400 text-sm mb-2">
                    Old Password
                  </label>

                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6]"
                  />

                </div>

                <div>

                  <label className="block text-gray-400 text-sm mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6]"
                  />

                </div>

                <button
                  onClick={updatePassword}
                  className="w-full bg-transparent border border-[#00e6e6] text-[#00e6e6] py-3 rounded-lg font-bold transition-all duration-300 hover:bg-[#00e6e6] hover:text-[#1a1e24]"
                >
                  Update Password
                </button>

              </div>

            )}

          </div>


          <div className="mt-10 pt-8 border-t border-gray-800 w-full max-w-md">

            <button
              onClick={deleteAccount}
              className="w-full bg-transparent border border-red-500 text-red-500 py-3 rounded-lg font-bold transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              Delete Account
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Profile