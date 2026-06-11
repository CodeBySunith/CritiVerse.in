import React from 'react'
import { FaThumbsUp, FaThumbsDown, FaFlag, FaStar} from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const GameReviewCard = ({ review }) => {

  if (!review) return null;

  return (
    <div className='flex flex-col max-w-full bg-navbgclr p-4 rounded-lg border border-white/5 shadow-md mb-4'>

    
      <div className='pb-4 flex flex-col gap-y-1.5 text-left w-full'>
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
                  {review.userid?.name || "Anonymous User"}
                </h1>
              </div>
            </Link>
              {review.rating && (
  <div className='flex items-center justify-center gap-1 pl-12'>

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
            <div className='flex pt-1 pl-12'>
                <p className='text-secText text-xs'>
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                </p>
            </div>
            
        </div>

        <div className='flex items-center gap-4 p-2.5 justify-center md:text-base text-sm'>
            <div className='flex gap-x-1.5 items-center'>
                <button aria-label="Like" className="cursor-pointer group">
                  <FaThumbsUp className='text-zinc-500 group-hover:text-green-500 transition-colors'/>
                </button>
                <p className='text-secText text-xs'>{review.like || 0}</p>
            </div>

            <div className='flex gap-x-1.5 items-center'>
                <button aria-label="Dislike" className="cursor-pointer group">
                  <FaThumbsDown className='text-zinc-500 group-hover:text-red-500 transition-colors'/>
                </button>
                <p className='text-secText text-xs'>{review.dislike || 0}</p>
            </div>

            <div className='flex gap-x-1.5 items-center'>
                <button aria-label="Report" className="cursor-pointer group">
                  <FaFlag className='text-zinc-500 group-hover:text-amber-500 transition-colors'/>
                </button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default GameReviewCard;