import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";
import { fetchSearchSuggestions } from '../../api/GameAPI';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const delaySearch = setTimeout(async () => {
      try {
        const results = await fetchSearchSuggestions(searchQuery);
        setSearchResults(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error("Error fetching live search:", error);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (gameId) => {
    navigate(`/games/${gameId}`);
    clearSearch();
  };

  return (
    <form 
      onSubmit={handleSearchSubmit} 
      ref={searchRef}
      className="relative w-full mb-6"
    >
      <div className="flex items-center w-full bg-navbgclr border border-[#333] rounded-lg py-1.5 pl-4 pr-2 transition-colors duration-300 focus-within:border-[#00e6e6]">
        
        {searchQuery && (
          <button 
            type="button" 
            onClick={clearSearch} 
            className="text-[#888] hover:text-[#ff4d4d] text-lg p-1.5 flex items-center transition-colors"
            aria-label="Clear text input"
          >
            <IoCloseCircleOutline />
          </button>
        )}

        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowSuggestions(true)}
          className="flex-1 bg-transparent border-none text-white outline-none text-sm px-2 text-center placeholder-[#666]"
        />

        <button 
          type="submit" 
          className="text-[#888] hover:text-[#00e6e6] text-lg p-2 flex items-center justify-center transition-colors"
          aria-label="Submit search query"
        >
          <IoSearchOutline />
        </button>
      </div>

      {showSuggestions && searchResults.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#222731] border border-[#3f4652] rounded-xl max-h-[300px] overflow-y-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 flex flex-col py-2 scrollbar-thin scrollbar-thumb-[#3f4652]">
          {searchResults.map((game) => (
            <div
              key={game._id}
              onClick={() => handleSuggestionClick(game._id)}
              className="flex items-center gap-3 px-[18px] py-2.5 text-[#d1d5db] cursor-pointer transition-colors duration-200 hover:bg-[#3f4652] hover:text-[#00e6e6]"
            >
              <IoSearchOutline className="text-[#888] text-[1.1rem]" />
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {game.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
