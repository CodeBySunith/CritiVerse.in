import React, { useEffect, useState } from 'react'
import { FaStar, FaPlus, FaCheck, FaHeart, } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { GetSingleGame } from '../../api/GameAPI'
import { GetGameTrackingAPI, ToggleStatusAPI, ToggleFavoriteAPI } from '../../api/ListAPI'
import { useAuth } from '../../Context/AuthContext'

const GameCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [status, setStatus] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
  const fetchGameDetails = async () => {
    try {
      setLoading(true);

      const data = await GetSingleGame(id);

      if (data) {
        setGame(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchGameDetails();
  }
}, [id]);


  useEffect(() => {
    if (user && id) {
      GetGameTrackingAPI(id).then((res) => {
        if (res.success) {
          setStatus(res.status);
          setIsFavorite(res.isFavorite);
        }
      });
    }
  }, [id, user]);


  const handleStatusToggle = async (target) => {
    if (!user) {
      alert("Please log in to track your games.");
      return;
    }
    const res = await ToggleStatusAPI(id, target);
    if (res.success) {
      setStatus(res.status);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert("Please log in to favorite your games.");
      return;
    }
    const res = await ToggleFavoriteAPI(id);
    if (res.success) {
      setIsFavorite(res.isFavorite);
    }
  };


  if (loading) {
    return (
      <div className="bg-bgclr min-h-100 flex items-center justify-center text-white font-bold">
        Loading Game Profile...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="bg-bgclr min-h-100 flex items-center justify-center text-rose-400 font-bold">
        Game details could not be found.
      </div>
    );
  }

  return (
    <div 
      className='bg-center bg-no-repeat overflow-hidden bg-cover' 
      style={{ backgroundImage: `url(${game.coverImage})` }}
    >
      <div className='bg-black/80 w-full h-full p-6 backdrop-blur-md'>
        
        <div className='flex justify-between pb-3'>
          <div>
            <h1 className='text-xl text-white font-black md:text-3xl mb-4'>
              {game.title}
            </h1>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-start gap-6'>
          
          <div className='w-full md:w-xs max-w-[320px]'>
            <img 
              className='aspect-square w-full object-cover rounded-lg border border-gray-700' 
              src={game.coverImage} 
              alt={`${game.title} Banner`} 
            />
          </div>

          <div className="flex-1 flex flex-col gap-6">

  <div className="grid lg:grid-cols-4 gap-6">

    <div className="lg:col-span-3 grid md:grid-cols-2 gap-4">

      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-1">
          Developer
        </h4>
        <p className="text-white">
          {game.developer || "N/A"}
        </p>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-1">
          Publisher
        </h4>
        <p className="text-white">
          {game.publisher || "N/A"}
        </p>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-1">
          Release Year
        </h4>
        <p className="text-white">
          {game.releaseDate
            ? game.releaseDate.toString().split("-")[0]
            : "N/A"}
        </p>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-1">
          Total Reviews
        </h4>
        <p className="text-white">
          {game.totalReviews || 0}
        </p>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-lg p-4 md:col-span-2">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-2">
          Platforms
        </h4>

        <div className="flex flex-wrap gap-2">
          {game.platforms?.map((platform, index) => (
            <span
              key={index}
              className="bg-[#00e6e6]/10 text-[#00e6e6] px-3 py-1 rounded-full text-xs"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-lg p-4 md:col-span-2">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-2">
          Genres
        </h4>

        <div className="flex flex-wrap gap-2">
          {game.genre?.map((genre, index) => (
            <span
              key={index}
              className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

    </div>

    <div className="space-y-4">

      <div className="bg-black/60 border border-[#00e6e6] rounded-lg p-4 text-center">
        <h4 className="text-xs uppercase text-gray-400 font-bold mb-2">
          Rating
        </h4>

        <div className="flex justify-center items-center gap-2 mb-2">
          <FaStar className="text-[#00e6e6]" />
          <span className="text-3xl font-black text-white">
            {game.averageRating || 0}
          </span>
        </div>

        <p className="text-xs text-gray-400">
          Based on {game.totalReviews || 0} Reviews
        </p>
      </div>

      <div className="flex flex-col gap-3">

  <div className="grid grid-cols-2 gap-3">

    <button
      onClick={() => handleStatusToggle('want')}
      className={`w-full flex flex-col items-center justify-center py-3 rounded-lg transition ${
        status === 'want'
          ? 'bg-[#00e6e6] text-black'
          : 'bg-black/40 text-[#00e6e6] border border-[#00e6e6]'
      }`}
    >
      <FaPlus />
      <span className="text-xs mt-1">Want</span>
    </button>

    <button
      onClick={() => handleStatusToggle('played')}
      className={`w-full flex flex-col items-center justify-center py-3 rounded-lg transition ${
        status === 'played'
          ? 'bg-[#00e6e6] text-black'
          : 'bg-black/40 text-[#00e6e6] border border-[#00e6e6]'
      }`}
    >
      <FaCheck />
      <span className="text-xs mt-1">Played</span>
    </button>

  </div>
  
  <button
    onClick={handleFavoriteToggle}
    className={`w-full flex flex-col items-center justify-center py-3 rounded-lg transition ${
      isFavorite
        ? 'bg-[#ff007f] text-white'
        : 'bg-black/40 text-[#ff007f] border border-[#ff007f]'
    }`}
  >
    <FaHeart />
    <span className="text-xs mt-1">Favorite</span>
  </button>

</div>

    </div>

  </div>

</div>
          
        </div>

  <div className="bg-black/30 border border-white/10 rounded-lg p-6 w-full mt-6">
    <h3 className="text-[#00e6e6] text-xl font-bold mb-4">
      About {game.title}
    </h3>

    <p className="text-gray-300 leading-8 line-clamp-10 md:line-clamp-none">
      {game.description ||
        "No description available for this game."}
    </p>
  </div>

      </div>
    
    </div>
  )
}

export default GameCard;
