import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Cards/Card';

const Carousel = ({ title, linkTo, games }) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [games]);

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.75;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!games || games.length === 0) return null;

  return (
    <div className='flex flex-col gap-2.5 relative group py-6'>
      <div className='flex gap-1.5 text-[#00e6e6] pb-2.5 items-center font-extrabold'>
        <div className='bg-[#00e6e6] max-w-fit sm:p-1 p-0.2 sm:py-3 py-0 '>
          <h1>|</h1>
        </div>
        <h1 className='text-sm sm:text-4xl uppercase'>{title} ❯</h1>
      </div>

      <div className="relative w-full">    
        {canScrollLeft && (
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-[#00e6e6] border border-neutral-800 w-10 h-16 flex items-center justify-center rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            ❮
          </button>
        )}

        <div 
          ref={trackRef}
          onScroll={checkScrollPosition}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {games.map((game) => (
            <div key={game._id} className="flex-none w-45 sm:w-80">
              <Card games={game} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-[#00e6e6] border border-neutral-800 w-10 h-16 flex items-center justify-center rounded-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
