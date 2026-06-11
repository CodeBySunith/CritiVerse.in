import { GetAllGamesAdminAPI, DeleteGameAPI } from '../../api/AdminAPI';

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
    <div className="bg-navbgclr rounded-lg border border-[#333] overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#1a1e24]">
          <tr className="border-b border-[#333] text-[#b3b3b3] text-sm uppercase tracking-wider">
            <th className="p-4 w-16">Cover</th>
            <th className="p-4">Game Title</th>
            <th className="p-4">Developer</th>
            <th className="p-4">Release Year</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No games found in database.</td>
            </tr>
          ) : (
            games.map((game) => (
              <tr key={game._id} className="border-b border-[#333] hover:bg-[#1a1a1a] transition-colors">
                
                <td className="p-4">
                  <img 
                    src={game.coverImage || 'https://via.placeholder.com/150'} 
                    alt="cover" 
                    className="w-10 h-10 object-cover rounded shadow-md border border-[#333]"
                  />
                </td>
                
                <td className="p-4 font-bold text-white">
                  {game.title}
                  {game.isImported && (
                    <span className="ml-2 text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      RAWG API
                    </span>
                  )}
                </td>
                
                <td className="p-4 text-gray-400 text-sm">{game.developer}</td>
                
                <td className="p-4 text-gray-400 text-sm">
                  {game.releaseDate ? game.releaseDate.toString().split('-')[0] : 'N/A'}
                </td>
                
                <td className="p-4 flex justify-center items-center h-full mt-1 gap-2">
                  <button 
                    onClick={() => handleDelete(game._id, game.title)}
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
  );
};