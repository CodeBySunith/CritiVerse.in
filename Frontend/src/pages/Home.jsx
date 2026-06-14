import React, { useState, useEffect } from 'react';
import { NewGames,TopGames, TopPCGames, TopPSGames, TopXBGames, TopMobileGames } from '../api/GameAPI';
import {NewReviews} from '../api/ReviewAPI'
import Carousel from '../components/Design/Carousel'
import CategoryCard from '../components/Cards/CategoryCard';
import Reviewcard from '../components/Cards/Reviewcard';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/Design/HeroSlider'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [topratedGames, setTopratedGames] = useState([]);
  const [toppcGames, setTopPCGames] = useState([]);
  const [toppsGames, setTopPSGames] = useState([]);
  const [topxbGames, setTopXBGames] = useState([]);
  const [topmobileGames, setTopMobileGames] = useState([]);
  const [newReviews, setNewReviews] = useState([])


  useEffect(() => {
    const getGamesData = async () => {

       const [newReleseData, topratedData, newReviewsData, toppcGameData, toppsGameData, topxbGameData, topmobileGameData] = await Promise.all([
          NewGames(),
          TopGames(),
          NewReviews(),
          TopPCGames(),
          TopPSGames(),
          TopXBGames(),
          TopMobileGames()
        ]);

      if (newReleseData && newReleseData.games) {
        setNewReleases(newReleseData.games); 
      }

      if (topratedData && topratedData.games){
        setTopratedGames(topratedData.games)
      }

      if (newReviewsData && newReviewsData.newReviews){
        setNewReviews(newReviewsData.newReviews)
      }

      if (toppcGameData && toppcGameData.games){
        setTopPCGames(toppcGameData.games)
      }

      if (toppsGameData && toppsGameData.games){
        setTopPSGames(toppsGameData.games)
      }

      if (topxbGameData && topxbGameData.games){
        setTopXBGames(topxbGameData.games)
      }
      
      if (topmobileGameData && topmobileGameData.games){
        setTopMobileGames(topmobileGameData.games)
      }

    };

    getGamesData();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col h-auto p-5 bg-bgclr gap-6">

        <HeroSlider/>

      <Carousel 
        title="Popular Games" 
        games={topratedGames} 
      />

      <Carousel 
        title="New Releases"  
        games={newReleases} 
      />

      <Carousel 
        title="Top Mobile Games" 
        games={topmobileGames} 
      />

      <Carousel 
        title="Top PC Games" 
        games={toppcGames} 
      />

      <Carousel 
        title="Top PlayStation Games" 
        games={toppsGames} 
      />

      <Carousel 
        title="Top Xbox Games" 
        games={topxbGames} 
      />



<div className=' text-[#00e6e6] flex items-center gap-x-2'>
  <div className='bg-[#00e6e6] max-w-fit sm:p-1 p-0.2 sm:py-3 py-0 '>
          <h1>|</h1>
  </div>
  <h1 className='text-sm sm:text-4xl font-extrabold uppercase'>Recently Reviewed ❯</h1>
  </div>
<div className='grid gap-3 lg:grid-cols-2 grid-cols-1 w-full'>
  
  {!newReviews || newReviews.length === 0 ? (
    <div className="text-gray-400 p-4 col-span-full text-center">
      Loading recent reviews...
    </div>
  ) : (
    newReviews.map((item) => (
      <Reviewcard key={item._id} review={item} />
    ))
  )}
</div>

 

    </div>
    <Footer/>
</div>
  );
};

export default Home;
