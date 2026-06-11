import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const RatingStars = ({ currentRating, onRatingSelect, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex flex-col items-center p-3 bg-black/40 border border-white/5 rounded-lg my-2 w-full">
      <div className="flex gap-1.5 justify-center items-center">
        {[...Array(10)].map((_, index) => {
          const starValue = index + 1;
          const isHighlighted = hoverRating ? starValue <= hoverRating : starValue <= currentRating;

          return (
            <button
              key={starValue}
              type="button"
              disabled={disabled}
              onClick={() => onRatingSelect(starValue)}
              onMouseEnter={() => !disabled && setHoverRating(starValue)}
              onMouseLeave={() => !disabled && setHoverRating(0)}
              className={`p-0.5 transition-all duration-150 transform hover:scale-125 focus:outline-none ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <FaStar 
                className={`text-base transition-colors duration-150 ${
                  isHighlighted 
                    ? 'text-[#00e6e6] drop-shadow-[0_0_6px_rgba(0,230,230,0.6)]' 
                    : 'text-neutral-700'
                }`} 
              />
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-widest font-semibold">
        {hoverRating ? `Give ${hoverRating} / 10` : currentRating ? `Your Score: ${currentRating} / 10` : "Rate this Game"}
      </p>
    </div>
  );
};

export default RatingStars;
