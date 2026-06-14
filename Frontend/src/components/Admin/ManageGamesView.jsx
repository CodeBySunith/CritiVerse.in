import React, { useEffect, useState } from 'react';
import { GetAllGamesAdminAPI, DeleteGameAPI } from '../../api/AdminAPI';
import { IoSearchOutline, IoCloseCircleOutline, IoSearch } from "react-icons/io5";

const ManageGamesView = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      const data = await GetAllGamesAdminAPI(page, searchTerm);

      if (data && Array.isArray(data.games)) {
        setGames(data.games);
        setTotalpage(data.totalpages || 1);
      } else {
        setGames([]);
        setTotalpage(1);
      }

      setLoading(false);
    };

    fetchGames();
  }, [page, searchTerm]);

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchInput);
  };

  const handleDelete = async (gameId, gameTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${gameTitle}"?`
    );
    if (!confirmDelete) return;

    const res = await DeleteGameAPI(gameId);

    if (
      (res.message && res.message.includes("deleted")) ||
      (res.msg && res.msg.includes("deleted"))
    ) {
      setGames((prev) => prev.filter((g) => g._id !== gameId));
    } else {
      alert(res.message || res.msg || "Failed to delete game.");
    }
  };

  if (loading) {
    return (
      <div className="text-[#00e6e6] font-bold p-4 bg-navbgclr rounded-lg border border-[#333] animate-pulse">
        Loading games database...
      </div>
    );
  }

  return (
    <div>

      {/* SEARCH */}
      <div className="mb-6 flex gap-2">
        <div className="flex items-center flex-1 bg-navbgclr border border-[#333] rounded-lg py-2 pl-4 pr-2">
          <IoSearchOutline className="text-[#888] text-lg" />

          <input
            type="text"
            placeholder="Search games..."
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

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block bg-navbgclr rounded-lg border border-[#333] overflow-hidden">
        <table className="w-full text-left">

          <thead className="bg-[#1a1e24]">
            <tr className="text-sm text-[#b3b3b3] uppercase">
              <th className="p-4">Cover</th>
              <th className="p-4">Title</th>
              <th className="p-4">Developer</th>
              <th className="p-4">Year</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {games.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No games found
                </td>
              </tr>
            ) : (
              games.map((game) => (
                <tr key={game._id} className="border-b border-[#333]">

                  <td className="p-4">
                    <img
                      src={game.coverImage}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>

                  <td className="p-4 text-white font-bold">
                    {game.title}
                  </td>

                  <td className="p-4 text-gray-400">
                    {game.developer}
                  </td>

                  <td className="p-4 text-gray-400">
                    {game.releaseDate?.toString().split("-")[0] || "N/A"}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(game._id, game.title)}
                      className="text-red-400 border border-red-500/30 px-4 py-2 rounded hover:bg-red-500 hover:text-navbgclr font-bold"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE (FIXED) ================= */}
      <div className="md:hidden space-y-4">

        {games.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No games found
          </div>
        ) : (
          games.map((game) => (
            <div
              key={game._id}
              className="bg-navbgclr border border-[#333] rounded-xl p-4"
            >

              <div className="flex gap-4">

                <img
                  src={game.coverImage}
                  className="w-20 h-24 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-white font-bold">
                    {game.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {game.developer}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {game.releaseDate?.toString().split("-")[0] || "N/A"}
                  </p>
                </div>

              </div>

              <button
                onClick={() => handleDelete(game._id, game.title)}
                className="w-full mt-4 text-red-400 border border-red-500/30 py-2 rounded hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

      {/* ================= PAGINATION ================= */}
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

export default ManageGamesView;