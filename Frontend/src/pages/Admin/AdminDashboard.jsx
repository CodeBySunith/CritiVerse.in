import React, { useEffect, useState } from 'react';
import { ReviewCountAPI, GameCountAPI, UserCountAPI, AddGameFromRAWGAPI, GetAllUsersAPI, ToggleBanUserAPI, GetAllGamesAdminAPI, DeleteGameAPI } from '../../api/AdminAPI'; 
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const ManageGamesView = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const data = await GetAllGamesAdminAPI();
      
      if (data && data.games) {
        setGames(data.games);
      } else if (Array.isArray(data)) {
        setGames(data); 
      }
      setLoading(false);
    };
    fetchGames();
  }, []);

  const handleDelete = async (gameId, gameTitle) => {
    const confirmDelete = window.confirm(`Are you absolutely sure you want to delete "${gameTitle}"? This cannot be undone.`);
    if (!confirmDelete) return;

    const res = await DeleteGameAPI(gameId);

    if (res.message && res.message.includes("deleted") || res.msg && res.msg.includes("deleted")) {
      setGames(games.filter((game) => game._id !== gameId));
    } else {
      alert(res.message || res.msg || "Failed to delete game.");
    }
  };

  if (loading) {
    return <div className="text-[#00e6e6] font-bold p-4 bg-navbgclr rounded-lg border border-[#333] animate-pulse">Loading games database...</div>;
  }

  return (
  <div>

    <div className="hidden md:block bg-navbgclr rounded-lg border border-[#333] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#1a1e24]">
            <tr className="border-b border-[#333] text-[#b3b3b3] text-sm uppercase tracking-wider">
              <th className="p-4 w-20">Cover</th>
              <th className="p-4">Game Title</th>
              <th className="p-4">Developer</th>
              <th className="p-4">Release Year</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {games.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500"
                >
                  No games found in database.
                </td>
              </tr>
            ) : (
              games.map((game) => (
                <tr
                  key={game._id}
                  className="border-b border-[#333] hover:bg-[#1a1a1a] transition-colors"
                >
                  <td className="p-4">
                    <img
                      src={game.coverImage || 'https://via.placeholder.com/150'}
                      alt={game.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>

                  <td className="p-4 font-bold text-white">
                    {game.title}
                  </td>

                  <td className="p-4 text-gray-400">
                    {game.developer}
                  </td>

                  <td className="p-4 text-gray-400">
                    {game.releaseDate
                      ? game.releaseDate.toString().split('-')[0]
                      : 'N/A'}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        handleDelete(game._id, game.title)
                      }
                      className="text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Delete Game
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">

      {games.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          No games found in database.
        </div>
      ) : (
        games.map((game) => (
          <div
            key={game._id}
            className="bg-navbgclr border border-[#333] rounded-xl p-4"
          >

            <div className="flex gap-4">

              <img
                src={game.coverImage || 'https://via.placeholder.com/150'}
                alt={game.title}
                className="w-20 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">

                <h3 className="font-bold text-white text-lg">
                  {game.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {game.developer || "Unknown Developer"}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Release Year:{" "}
                  {game.releaseDate
                    ? game.releaseDate.toString().split('-')[0]
                    : 'N/A'}
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                handleDelete(game._id, game.title)
              }
              className="w-full mt-4 text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/30 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
            >
              Delete Game
            </button>

          </div>
        ))
      )}

    </div>

  </div>
);
};

const ManageUsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await GetAllUsersAPI();
      if (data && data.users) {
        setUsers(data.users);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleBanToggle = async (userId) => {
    const res = await ToggleBanUserAPI(userId);
    
    if (res.msg && res.msg.toLowerCase().includes("banned")) {
        setUsers(users.map(user => 
            user._id === userId ? { ...user, isBanned: res.isBanned } : user
        ));
    } else {
        alert(res.msg || "Failed to update user.");
    }
  };

  if (loading) {
    return <div className="text-[#00e6e6] font-bold p-4 bg-navbgclr rounded-lg border border-[#333] animate-pulse">Loading user database...</div>;
  }

  return (
  <div>

    <div className="hidden md:block bg-navbgclr rounded-lg border border-[#333] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#1a1e24]">
            <tr className="border-b border-[#333] text-[#b3b3b3] text-sm uppercase">
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-[#333] hover:bg-[#1a1a1a]"
              >
                <td className="p-4 font-bold text-white">
                  {user.username}
                </td>

                <td className="p-4 text-gray-400">
                  {user.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-black uppercase
                    ${
                      user.role === 'admin'
                        ? 'bg-[#00e6e6] text-[#1a1e24]'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-center">
                  {user.role !== 'admin' ? (
                    <button
                      onClick={() => handleBanToggle(user._id)}
                      className={`text-xs font-bold px-3 py-2 rounded
                      ${
                        user.isBanned
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-white'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      {user.isBanned ? 'Unban User' : 'Ban User'}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500">
                      Admin
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="md:hidden space-y-4">

      {users.map((user) => (
        <div
          key={user._id}
          className="bg-navbgclr border border-[#333] rounded-lg p-4"
        >

          <div className="flex justify-between items-start mb-3">

            <div>
              <h3 className="font-bold text-white">
                {user.username}
              </h3>

              <p className="text-sm text-gray-400 break-all">
                {user.email}
              </p>
            </div>

            <span
              className={`px-2 py-1 rounded text-[10px] font-black uppercase
              ${
                user.role === 'admin'
                  ? 'bg-[#00e6e6] text-[#1a1e24]'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {user.role}
            </span>

          </div>

          {user.role !== 'admin' ? (
            <button
              onClick={() => handleBanToggle(user._id)}
              className={`w-full text-sm font-bold py-2 rounded
              ${
                user.isBanned
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-white'
                  : 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white'
              }`}
            >
              {user.isBanned ? 'Unban User' : 'Ban User'}
            </button>
          ) : (
            <div className="text-center text-xs text-gray-500">
              Admin Account
            </div>
          )}

        </div>
      ))}

    </div>

  </div>
);
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userscount, setUserscount] = useState(0);
  const [reviewcount, setReviewcount] = useState(0);
  const [gamecount, setGamecount] = useState(0);

  const [rawgId, setRawgId] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importMessage, setImportMessage] = useState({ text: "", type: "" }); 

  useEffect(() => {
    const getData = async () => {
      try {
        const [ReviewcountData, GamecountData, UsercountData] = await Promise.all([
          ReviewCountAPI(),
          GameCountAPI(),
          UserCountAPI(),
        ]);

        if (ReviewcountData && ReviewcountData.Reviewcount) setReviewcount(ReviewcountData.Reviewcount);
        if (GamecountData && GamecountData.Gamecount) setGamecount(GamecountData.Gamecount);
        if (UsercountData && UsercountData.Usercount) setUserscount(UsercountData.Usercount);
      } catch (error) {
        console.error("Error fetching page layout data:", error);
      }
    };
    getData();
  }, []);

  const handleFetchAndSave = async (e) => {
    e.preventDefault();
    setImportMessage({ text: "", type: "" });

    if (!rawgId.trim()) {
      setImportMessage({ text: "Please enter a valid RAWG Game ID first.", type: "error" });
      return;
    }

    setImportLoading(true);
    try {
      const res = await AddGameFromRAWGAPI(rawgId.trim());

      if (res && (res.details || res.message === "Game successfully imported from RAWG.")) {
        setImportMessage({ text: res.message || "Game successfully saved to database!", type: "success" });
        setRawgId(""); 
        setGamecount(prev => prev + 1);
      } else {
        setImportMessage({ text: res.message || res.msg || "Failed to import game.", type: "error" });
      }
    } catch (err) {
      console.error("RAWG Import Network failure:", err);
      setImportMessage({ text: "Server error occurred. Please check network logs.", type: "error" });
    } finally {
      setImportLoading(false);
    }
  };

  const getTabClass = (tabName) => {
  return `
    whitespace-nowrap
    text-left
    p-3
    rounded
    font-bold
    transition-colors
    duration-200
    ${
      activeTab === tabName
        ? 'bg-[#00e6e6] text-[#1a1e24]'
        : 'text-[#b3b3b3] hover:text-white'
    }
  `;
};

  return (
  <div>
    <Navbar />

    <div className="flex flex-col lg:flex-row min-h-screen bg-bgclr text-white font-sans">

      {/* Sidebar */}
      <div
        className="
          w-full
          lg:w-64
          bg-navbgclr
          p-4
          lg:p-6
          flex
          lg:flex-col
          flex-row
          gap-2
          overflow-x-auto
          border-b
          lg:border-b-0
          lg:border-r
          border-white/10
        "
      >
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`${getTabClass('dashboard')} min-w-fit`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('addGames')}
          className={`${getTabClass('addGames')} min-w-fit`}
        >
          Add Games
        </button>

        <button
          onClick={() => setActiveTab('manageGames')}
          className={`${getTabClass('manageGames')} min-w-fit`}
        >
          Manage Games
        </button>

        <button
          onClick={() => setActiveTab('manageUsers')}
          className={`${getTabClass('manageUsers')} min-w-fit`}
        >
          Manage Users
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                Overview
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                <div className="bg-navbgclr p-6 rounded-xl border border-white/10 hover:border-[#00e6e6]/30 transition-all duration-300">
                  <h3 className="text-[#b3b3b3] text-sm mb-2">
                    Total Users
                  </h3>

                  <p className="text-3xl font-bold text-[#00e6e6]">
                    {userscount}
                  </p>
                </div>

                <div className="bg-navbgclr p-6 rounded-xl border border-white/10 hover:border-[#00e6e6]/30 transition-all duration-300">
                  <h3 className="text-[#b3b3b3] text-sm mb-2">
                    Games in Database
                  </h3>

                  <p className="text-3xl font-bold text-[#00e6e6]">
                    {gamecount}
                  </p>
                </div>

                <div className="bg-navbgclr p-6 rounded-xl border border-white/10 hover:border-[#00e6e6]/30 transition-all duration-300">
                  <h3 className="text-[#b3b3b3] text-sm mb-2">
                    Number of Reviews
                  </h3>

                  <p className="text-3xl font-bold text-[#00e6e6]">
                    {reviewcount}
                  </p>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'addGames' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                Add a New Game
              </h1>

              <div
                className="
                  bg-navbgclr
                  p-6
                  rounded-xl
                  border
                  border-[#00e6e6]
                  max-w-xl
                  mx-auto
                "
              >
                <p className="text-[#b3b3b3] mb-4">
                  Enter a RAWG Game ID to fetch and add to the database.
                </p>

                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={handleFetchAndSave}
                >
                  <input
                    type="number"
                    placeholder="e.g., 3498"
                    value={rawgId}
                    onChange={(e) => setRawgId(e.target.value)}
                    disabled={importLoading}
                    className="
                      flex-1
                      bg-[#1a1a1a]
                      border
                      border-[#333]
                      p-3
                      rounded-lg
                      text-white
                      outline-none
                      focus:border-[#00e6e6]
                    "
                  />

                  <button
                    type="submit"
                    disabled={importLoading}
                    className="
                      bg-[#00e6e6]
                      text-[#1a1e24]
                      font-bold
                      px-5
                      py-3
                      rounded-lg
                      transition-all
                      duration-300
                      hover:opacity-90
                      disabled:bg-gray-500
                    "
                  >
                    {importLoading ? "Fetching..." : "Fetch & Save"}
                  </button>
                </form>

                {importMessage.text && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm font-semibold ${
                      importMessage.type === "success"
                        ? "bg-green-500/20 border border-green-500 text-green-400"
                        : "bg-red-500/20 border border-red-500 text-red-400"
                    }`}
                  >
                    {importMessage.text}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'manageGames' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                Manage Games Database
              </h1>

              <ManageGamesView />

            </div>
          )}

          {activeTab === 'manageUsers' && (
            <div className="animate-fade-in space-y-6">

              <h1 className="text-2xl md:text-3xl font-bold">
                User Management
              </h1>

              <ManageUsersView />

            </div>
          )}

        </div>

      </div>

    </div>

    <Footer />
  </div>
);
};

export default AdminDashboard;