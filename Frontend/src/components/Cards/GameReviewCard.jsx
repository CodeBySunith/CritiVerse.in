import React from 'react'
import {FaStar} from 'react-icons/fa6'
import { MdOutlineReport } from "react-icons/md";
import { Link } from 'react-router-dom'
import { ReportReviewAPI } from '../../api/ReviewAPI'

const GameReviewCard = ({ review }) => {

  const handleReport = async () => {

  const reason = window.prompt(
    "Why are you reporting this review?"
  );

  if (!reason || !reason.trim()) return;

  const res = await ReportReviewAPI(
    review._id,
    reason.trim()
  );

  alert(res.msg || "Review reported");
};

  if (!review) return null;

  return (
    <div className='flex flex-col max-w-full bg-navbgclr p-4 rounded-lg border border-white/5 shadow-md mb-4'>

    
      <div className='pb-4 flex flex-col gap-y-1.5 text-left w-full'>
        {review.rating && (
  <div className='flex items-center gap-1 my-2'>

    {[...Array(10)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-[8px] md:text-xs ${
          index < review.rating
            ? 'text-[#00e6e6]'
            : 'text-neutral-700'
        }`}
      />
    ))}

  </div>
)}
        <p className='text-sm text-secText font-light leading-relaxed whitespace-pre-line'>
          {review.review || "No review content provided."}
        </p>
      </div>


      <hr className='border-neutral-800 mb-3' />

     
      <div className='flex justify-between items-center'>
        <div className='text-left flex flex-col'>
            <Link to={`/user/${review.userid?._id || ''}`}>
              <div className='flex items-center gap-2 group'>
                <img 
                  className='md:h-10 md:w-10 w-8 h-8 rounded-full object-cover border border-white/10' 
                  src={review.userid?.avatarURL} 
                  alt={review.userid?.name || "User Avatar"} 
                />
                <h1 className='text-white md:text-base text-sm font-medium group-hover:text-[#00e6e6] transition-colors'>
                  @{review.userid?.username || "Anonymous User"}
                </h1>
              </div>
            </Link>
              
            <div className='flex pt-1 pl-12'>
                <p className="text-secText text-xs">
                  {`${review.createdAt === review.updatedAt ? 'Review added on' : 'Review edited on'} ${
                    review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Recent'
                  }`}
                </p>
            </div>
            
        </div>

        <div className='flex items-center gap-4 p-2.5 justify-center md:text-base text-sm'>
            <div className='flex gap-x-1.5 items-center'>
                 <div className='flex items-center gap-4 p-2.5 justify-center md:text-base text-sm'>
                    <div className='flex gap-x-1.5 items-center'>
                      <button
                        aria-label="Report"
                        onClick={handleReport}
                      >
                        <MdOutlineReport
                          className='text-2xl md:text-3xl text-white hover:text-red-500 transition-colors'
                        />
                      </button>
                    </div>
                  </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default GameReviewCard;