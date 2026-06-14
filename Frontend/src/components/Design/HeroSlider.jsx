import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSlider() {
  const Navigate = useNavigate()
 const slides = [
  {
    title: "Real Gamers. Honest Ratings.",
    desc: "Bypass the corporate critic hype. Explore thousands of transparent, unfiltered game reviews written entirely by real players.",
  },
  {
    title: "Rate and Build Your Backlog",
    desc: "Log your completed campaigns, score your favorite mechanics, and curate the ultimate list of games to play next.",
  },
  {
    title: "Find Your Next Obsession",
    desc: "Discover trending hidden gems and popular titles ranked daily by community-driven scoreboards and user tags.",
  }
];


  return (
    <div className="h-[80vh] w-full text-white relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={'cards'}
        speed={800}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide 
            key={index} 
            className="bg-navbgclr h-full flex items-center justify-center left-0 w-full"
          >
            <div className="w-full max-w-4xl px-6 text-center flex flex-col justify-center items-center space-y-6 h-full mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight w-full">
                {slide.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                {slide.desc}
              </p>

              <div className="pt-4">
                <button className="bg-transparent border border-[#00e6e6] text-[#00e6e6] px-[1.2rem] py-2 rounded-sm font-bold transition-all duration-300 ease-out whitespace-nowrap hover:bg-[#00e6e6] hover:text-[#1a1e24] cursor-pointer" onClick={()=>{Navigate('/browse')}}>
                  Get Started
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
     
      <style>{`
        .swiper-pagination-bullet { 
          background: white !important; 
          opacity: 0.4; 
        }
        .swiper-pagination-bullet-active { 
          opacity: 1; 
          background: #00e6e6 !important; 
        }
      `}</style>
    </div>
  );
}
