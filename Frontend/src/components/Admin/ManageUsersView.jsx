import React, { useEffect, useState } from 'react';
import { IoSearchOutline, IoCloseCircleOutline, IoSearch } from "react-icons/io5";
import { GetAllUsersAPI, ToggleBanUserAPI } from '../../api/AdminAPI';

const ManageUsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);

    const data = await GetAllUsersAPI(page, searchTerm);

    if (data && Array.isArray(data.users)) {
      setUsers(data.users);
      setTotalpage(data.totalpages || 1);
    } else {
      setUsers([]);
      setTotalpage(1);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchInput.trim());
  };

  const handleBanToggle = async (userId) => {
    const targetUser = users.find((u) => u._id === userId);

    const confirmBan = window.confirm(
      `Are you sure you want to ${targetUser?.isBanned ? "unban" : "ban"} this user?`
    );

    if (!confirmBan) return;

    const res = await ToggleBanUserAPI(userId);

    if (typeof res.isBanned === "boolean") {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isBanned: res.isBanned } : user
        )
      );
    } else {
      alert(res.msg || "Failed to update user.");
    }
  };

  if (loading) {
    return (
      <div className="text-[#00e6e6] font-bold p-4 bg-navbgclr rounded-lg border border-[#333] animate-pulse">
        Loading user database...
      </div>
    );
  }

  return (
    <div>

      {/* 🔍 SEARCH BAR (GAMEVIEW STYLE) */}
      <div className="mb-6 flex gap-2">

        <div className="flex items-center flex-1 bg-navbgclr border border-[#333] rounded-lg py-2 pl-4 pr-2">
          <IoSearchOutline className="text-[#888] text-lg" />

          <input
            type="text"
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white px-3 text-sm"
          />

          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="text-[#888] hover:text-red-500"
            >
              <IoCloseCircleOutline />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg hover:bg-[#00e6e6] bg-navbgclr hover:text-bgclr text-[#00e6e6] font-bold"
        >
          <IoSearch />
        </button>
      </div>

      {/* 🖥️ DESKTOP TABLE (GAMEVIEW STYLE) */}
      <div className="hidden md:block bg-navbgclr rounded-lg border border-[#333] overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-[#1a1e24]">
            <tr className="text-sm text-[#b3b3b3] uppercase">
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b border-[#333]">

                  <td className="p-4 text-white font-bold">
                    @{user.username}
                  </td>

                  <td className="p-4 text-gray-400">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      user.role === "admin"
                        ? "bg-[#00e6e6] text-[#1a1e24]"
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => handleBanToggle(user._id)}
                        className={`text-xs font-bold px-5 py-3 rounded border transition ${
                          user.isBanned
                            ? "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500 hover:text-navbgclr"
                            : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500 hover:text-navbgclr"
                        }`}
                      >
                        {user.isBanned ? "Unban" : "Ban"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500">
                        Admin
                      </span>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* 📱 MOBILE (GAMEVIEW CARD STYLE) */}
      <div className="md:hidden space-y-4">

        {users.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No users found
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-navbgclr border border-[#333] rounded-lg p-4"
            >

              <div className="flex justify-between items-start">

                <div>
                  <h3 className="text-white font-bold">
                    @{user.username}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {user.email}
                  </p>
                </div>

                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                  user.role === "admin"
                    ? "bg-[#00e6e6] text-[#1a1e24]"
                    : "bg-gray-700 text-gray-300"
                }`}>
                  {user.role}
                </span>

              </div>

              {user.role !== "admin" && (
                <button
                  onClick={() => handleBanToggle(user._id)}
                  className={`mt-3 w-full text-sm font-bold py-2 rounded border ${
                    user.isBanned
                      ? "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500 hover:text-white"
                      : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  {user.isBanned ? "Unban User" : "Ban User"}
                </button>
              )}

            </div>
          ))
        )}

      </div>

      {/* 📄 PAGINATION (GAMEVIEW STYLE) */}
      <div className='flex gap-4 items-center justify-center mt-4'>
        <button 
          className='bg-transparent border border-[#00e6e6] text-[#00e6e6] px-5 py-2 rounded font-bold transition-all duration-300 ease-in-out hover:bg-[#00e6e6] hover:text-[#1a1e24] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#00e6e6] disabled:cursor-not-allowed' 
          disabled={page === 1} 
          onClick={() => setPage(prev => prev - 1)}
        >
          Prev
        </button>

        <span className='text-white text-xl font-extrabold px-2'>{page}</span>

        <button 
          className='bg-transparent border border-[#00e6e6] text-[#00e6e6] px-5 py-2 rounded font-bold transition-all duration-300 ease-in-out hover:bg-[#00e6e6] hover:text-[#1a1e24] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#00e6e6] disabled:cursor-not-allowed' 
          disabled={page === totalpage} 
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ManageUsersView;