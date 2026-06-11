import React from 'react';
import { Link } from 'react-router-dom'; 

const getRatingColor = (rating) => {
  const score = parseFloat(rating);
  if (isNaN(score)) return 'bg-zinc-300'; 
  if (score >= 8.5) return 'bg-emerald-400 border border-emerald-500/30';
  if (score >= 7.0) return 'bg-green-400 border border-green-500/30';
  if (score >= 5.0) return 'bg-amber-400 border border-amber-500/30';
  if (score === 0) return 'bg-white border border-black';
  return 'bg-rose-400 border border-rose-500/30';
};

const Card = ({ games }) => {
  return (
    <div className='flex flex-col gap-y-1 w-full bg-cardbg h-full rounded-lg overflow-hidden border border-[#2a2f38]'>

     
      <div className='flex flex-col items-center relative w-full'>
        <Link to={`/games/${games._id}`} className='block relative w-full'>
          <img 
            className='w-full aspect-video object-cover' 
            src={games.coverImage} 
            alt={`${games.title} cover`} 
          />
          <h3 className={`absolute left-2 top-2 w-12 py-1.5 text-base font-bold text-black text-center rounded-md shadow-md backdrop-blur-sm ${getRatingColor(games.averageRating)}`}>
            {games.averageRating ? games.averageRating : '0'}
          </h3>
        </Link>
      </div>

      <div className='flex flex-col gap-1 grow p-3 text-left w-full'>
        <Link to={`/games/${games._id}`} className='block relative w-full'>
          <h1 className='text-titleText text-xl font-bold line-clamp-2 mb-2'>
            {games.title}
          </h1>
        </Link>

        <div className='mt-auto flex flex-col gap-1'>
          
          
          <div className='text-sm text-secText flex flex-wrap gap-x-1.5 gap-y-0.5 w-full text-left'>
            {games.genre && games.genre.length > 0 ? (
              games.genre.map((g, index) => (
                <span key={g} className="flex items-center">
              
                  <Link 
                    to={`/browse?genre=${g.trim()}`} 
                    className="hover:text-white transition-colors duration-200"
                  >
                    {g}
                  </Link>
                  {index < games.genre.length - 1 && <span className="ml-1.5 text-zinc-500">|</span>}
                </span>
              ))
            ) : (
              <span>No Genre</span>
            )}
          </div>

     
          <h3 className='text-sm text-secText mt-0.5'>
            {games.releaseDate ? games.releaseDate.toString().split('-')[0] : 'N/A'}
          </h3>
        </div>
      </div>

    </div>
  );
};

export default Card;
