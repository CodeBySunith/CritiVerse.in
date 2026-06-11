import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import GameReviewCard from '../components/Cards/GameReviewCard';
import GameCard from '../components/Cards/GameCard';
import { GetGameReviewsAPI, GetMyGameReview, CreateReviewAPI, EditReviewAPI } from '../api/ReviewAPI';
import Carousel from '../components/Design/Carousel';
import MyReviewCard from '../components/Cards/MyReviewCard';
import { useAuth } from '../Context/AuthContext'; 
import { FaPen, FaXmark, FaCheck } from 'react-icons/fa6'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const GamePage = () => {
  const { id } = useParams(); 
  const { user } = useAuth(); 

  const [gameReviews, setGameReviews] = useState([]); 
  const [myreview, setMyreview] = useState(null); 
  const [loadingMyReview, setLoadingMyReview] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [reviewInput, setReviewInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getGamesData = async () => {
    try {
      setLoadingMyReview(true);
      
      const [gameReviewsData, myreviewData] = await Promise.all([
        GetGameReviewsAPI(id),
        GetMyGameReview(id)
      ]);

      if (gameReviewsData && gameReviewsData.gameReviews) {
        setGameReviews(gameReviewsData.gameReviews); 
      }
      if (myreviewData && myreviewData.review){
        setMyreview(myreviewData.review);
        setReviewInput(myreviewData.review.review || ""); 
      } else {
        setMyreview(null);
        setReviewInput("");
      }

    } catch (error) {
      console.error("Error fetching page layout data:", error);
    } finally {
      setLoadingMyReview(false);
    }
  };

  useEffect(() => {
    getGamesData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;
    setIsSubmitting(true);

    let res;
    if (myreview) {
      res = await EditReviewAPI(id, reviewInput);
    } else {
      res = await CreateReviewAPI(id, reviewInput);
    }

    if (res && res.success) {
      setShowForm(false);
      await getGamesData(); 
    } else {
      alert(res?.msg || res?.message || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  const filteredCommunityReviews = gameReviews.filter(
    (item) => item.userid?._id !== user?._id
  );

  return (
    <div>
      <Navbar/>
    <div className='bg-bgclr p-4 min-h-screen text-white'>
      <GameCard />

      <div className='grid gap-3 lg:grid-cols-1 grid-cols-1 w-full pt-4 mb-6 border-b border-white/5 pb-6'>
        <div className="flex justify-between items-center px-1 mb-4">
          <h2 className='text-white text-xl font-bold'>Your Review</h2>
          
          {user ? (
            !loadingMyReview && (
              <button
                onClick={() => setShowForm(!showForm)}
                className='flex flex-col items-center justify-center bg-black/40 border border-[#00e6e6] text-[#00e6e6] px-4 py-2 rounded-md font-bold transition-all duration-300 ease-out whitespace-nowrap hover:bg-[#00e6e6] hover:text-[#1a1e24]'
              >
                {showForm ? (
                  <>
                    <FaXmark className='text-lg mb-1' />
                    <span className='text-[10px] uppercase tracking-wider'>Cancel</span>
                  </>
                ) : myreview ? (
                  <>
                    <FaPen className='text-md mb-1.5' />
                    <span className='text-[10px] uppercase tracking-wider'>Edit Review</span>
                  </>
                ) : (
                  <>
                    <FaPen className='text-md mb-1.5' />
                    <span className='text-[10px] uppercase tracking-wider'>Write Review</span>
                  </>
                )}
              </button>
            )
          ) : (
            <Link 
              to="/login" 
              className='flex flex-col items-center justify-center bg-black/40 border border-[#00e6e6] text-[#00e6e6] px-4 py-2 rounded-md font-bold transition-all duration-300 ease-out whitespace-nowrap hover:bg-[#00e6e6] hover:text-[#1a1e24] cursor-pointer min-w-22.5 text-center'
            >
              <span className='text-[10px] uppercase tracking-wider py-2'>Login to Write Review</span>
            </Link>
          )}
        </div>

        {showForm && user && (
          <form onSubmit={handleReviewSubmit} className="bg-navbgclr p-5 rounded-lg border border-white/10 flex flex-col gap-3 my-2 shadow-xl">
            <h3 className="text-[#00e6e6] text-sm font-semibold tracking-wide uppercase text-[11px]">
              {myreview ? "Update Your Existing Review" : "Write Your Review for this Game"}
            </h3>
            <textarea
              className="w-full bg-neutral-900/80 text-white p-4 rounded-lg border border-neutral-800 text-sm focus:outline-none focus:border-[#00e6e6] placeholder-neutral-500 transition duration-200"
              rows="5"
              placeholder="What did you like or dislike about this game?"
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className='flex flex-col items-center justify-center bg-black/40 border border-neutral-600 text-neutral-400 px-4 py-1.5 rounded-md font-bold transition-all duration-300 ease-out whitespace-nowrap hover:bg-neutral-600 hover:text-white cursor-pointer min-w-20'
              >
                <FaXmark className='text-md mb-1' />
                <span className='text-[9px] uppercase tracking-wider'>Discard</span>
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || !reviewInput.trim()}
                className='flex flex-col items-center justify-center bg-black/40 border border-[#00e6e6] text-[#00e6e6] px-4 py-1.5 rounded-md font-bold transition-all duration-300 ease-out whitespace-nowrap hover:bg-[#00e6e6] hover:text-[#1a1e24] cursor-pointer min-w-20 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#00e6e6] disabled:cursor-not-allowed'
              >
                <FaCheck className='text-md mb-1' />
                <span className='text-[9px] uppercase tracking-wider'>
                  {isSubmitting ? "Saving..." : "Post"}
                </span>
              </button>
            </div>
          </form>
        )}
        
        {loadingMyReview ? (
          <div className="text-gray-400 p-4 bg-navbgclr rounded-lg border border-white/5 text-center text-sm">
            Checking database records...
          </div>
        ) : myreview ? (
          <div className="max-w-full">
            <MyReviewCard review={myreview} />
          </div>
        ) : (
          !showForm && (
            <div className="text-gray-500 p-8 bg-navbgclr/50 rounded-lg border border-white/5 border-dashed text-center text-sm">
              You haven't shared your opinion on this game yet.
            </div>
          )
        )}
      </div>

      <h2 className='text-white text-xl font-bold px-1 mt-6 mb-3'>Player Reviews for this Game</h2>
      <div className='grid gap-4 lg:grid-cols-2 grid-cols-1 w-full pt-2 mb-8'>
        {filteredCommunityReviews.length === 0 ? (
          <div className="text-gray-500 p-8 col-span-full text-center bg-navbgclr/30 rounded-lg border border-white/5 text-sm italic">
            No other community reviews have been posted for this game yet.
          </div>
        ) : (
          filteredCommunityReviews.map((item) => (
            <GameReviewCard key={item._id} review={item} />
          ))
        )}
      </div>

    </div>
    <Footer/>
</div>
  );
};

export default GamePage;