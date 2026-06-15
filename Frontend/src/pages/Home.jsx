import React, { useState, useEffect } from 'react';
import { NewGames,TopGames, TopPCGames, TopPSGames, TopXBGames, TopMobileGames } from '../api/GameAPI';
import Carousel from '../components/Design/Carousel'
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


  useEffect(() => {
    const getGamesData = async () => {

       const [newReleseData, topratedData, toppcGameData, toppsGameData, topxbGameData, topmobileGameData] = await Promise.all([
          NewGames(),
          TopGames(),
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

 

    </div>
    <Footer/>
</div>
  );
};

export default Home;
