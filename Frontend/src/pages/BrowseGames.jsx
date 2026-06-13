import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Cards/Card'
import { AllGames } from '../api/GameAPI';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SearchBar from '../components/SearchBar/SearchBar';

const currentYear = new Date().getFullYear();
const startYear = 1980; 
const yearsArray = Array.from(
  { length: currentYear - startYear + 1 }, 
  (_, index) => currentYear - index
);

const BrowseGames = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [gamesList, setGamesList] = useState([]);
  const [page, setPage] = useState(1)
  const [totalpage, setTotalpage] = useState(1)

  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('');


  useEffect(() => {
    const urlGenre = searchParams.get('genre') || '';
    setGenre(urlGenre);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const getGames = async () => {
      const data = await AllGames({ page, platform, genre, rating, year, sortBy });
      if (data && data.games) {
        setGamesList(data.games); 
      } else {
        setGamesList([]);
      }
      if (data && data.totalpages) {
        setTotalpage(data.totalpages)
      }
    };

    getGames();
  }, [page, platform, genre, rating, year, sortBy]);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1); 
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
    setPage(1);
    
    if (value) {
      setSearchParams({ genre: value });
    } else {
      searchParams.delete('genre');
      setSearchParams(searchParams);
    }
  };

  const selectClass = "w-full bg-[#1a1e24] text-white border border-[#333] rounded px-4 py-2.5 outline-none font-medium cursor-pointer transition-colors duration-200 focus:border-[#00e6e6] hover:bg-[#222730]";

  return (
    <div>
      <Navbar/>
    <div className='bg-bgclr min-h-screen px-6 pt-6 text-secText flex flex-col'>
<div>
    <SearchBar/>
</div>

      <div className='grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-full mb-8 bg-navbgclr p-4 rounded-lg border border-[#2a2f38]'>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-[#b3b3b3]'>Platform</label>
          <select value={platform} onChange={handleFilterChange(setPlatform)} className={selectClass}>
             <option value="">All Platforms</option>
             <option value="PlayStation">PlayStation</option>
             <option value="Nintendo Switch">Nintendo Switch</option>
             <option value="Xbox">Xbox</option>
             <option value="PC">PC</option>
             <option value="macOS">macOS</option>
             <option value="Linux">Linux</option>
          </select>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-[#b3b3b3]'>Genre</label>
          <select value={genre} onChange={handleGenreChange} className={selectClass}>
             <option value="">All Genres</option>
             <option value="Action">Action</option>
             <option value="RPG">RPG</option>
             <option value="Shooter">Shooter</option>
             <option value="Adventure">Adventure</option>
             <option value="Indie">Indie</option>
             <option value="Strategy">Strategy</option>
             <option value="Casual">Casual</option>
             <option value="Simulation">Simulation</option>
             <option value="Puzzle">Puzzle</option>
             <option value="Arcade">Arcade</option>
             <option value="Platformer">Platformer</option>
             <option value="Racing">Racing</option>
             <option value="Sports">Sports</option>
             <option value="Fighting">Fighting</option>
             <option value="Family">Family</option>
             <option value="Board Games">Board Games</option>
             <option value="Educational">Educational</option>
             <option value="Card">Card</option>
             <option value="Massively Multiplayer">Massively Multiplayer</option>
             <option value="Horror">Horror</option>

          </select>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-[#b3b3b3]'>Average Ratings</label>
          <select value={rating} onChange={handleFilterChange(setRating)} className={selectClass}>
             <option value="">All Ratings</option>
             <option value="10">10</option>
             <option value="9">9</option>
             <option value="8">8</option>
             <option value="7">7</option>
             <option value="6">6</option>
             <option value="below5">Below 5</option>
          </select>
        </div>

   
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-[#b3b3b3]'>Release Year</label>
          <select value={year} onChange={handleFilterChange(setYear)} className={selectClass}>
             <option value="">All Years</option>
             {yearsArray.map((y) => (
               <option key={y} value={y}>{y}</option>
             ))}
          </select>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-bold uppercase tracking-wider text-[#b3b3b3]'>Sort By</label>
          <select value={sortBy} onChange={handleFilterChange(setSortBy)} className={selectClass}>
             <option value="">Default</option>
             <option value="rating_asc">By rating asc</option>
             <option value="rating_desc">By rating des</option>
             <option value="year_asc">By release year asc</option>
             <option value="year_desc">By release year des</option>
          </select>
        </div>

      </div>

    
      <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-start gap-6 pb-12 flex-1 w-full'>
        {gamesList?.length > 0 ? (
          gamesList.map((game) => (
            <Card key={game._id} games={game} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#b3b3b3]">
            No games found matching your selection.
          </div>
        )}
      </div>

    
      <div className='flex gap-4 items-center justify-center pb-8 mt-auto'>
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
  <Footer/>
</div>
  )
}

export default BrowseGames;
