import React from 'react'
import { MdOutlineReport } from "react-icons/md";
import { Link } from 'react-router-dom'

const Reviewcard = ({ review }) => {

  if (!review) return null;

  return (
    <div className='flex flex-col max-w-full bg-navbgclr p-3 rounded-lg border border-white/5 shadow-md'>

       <Link to={`/games/${review.gameid?._id || ''}`}>
       <div className='flex gap-4 pb-5'>

        {review.gameid?.coverImage ? (
          <div className='w-48 aspect-square shrink-0 hidden md:block'>
              <img className='w-full h-full object-cover rounded-lg' src={review.gameid.coverImage} alt={review.gameid?.title} />
          </div>
        ) : (
          <div className='w-48 aspect-square bg-neutral-800 shrink-0 hidden md:flex items-center justify-center text-xs text-gray-500 rounded-lg'>
            No Image
          </div>
        )}

        <div className='flex flex-col gap-y-1.5 p-2.5 w-full'>
      
            <div>
              <h1 className='text-xl font-bold text-white line-clamp-1'>
                {review.gameid?.title || "Deleted/Missing Game"}
              </h1>
            </div>
            <div>
              <p className='line-clamp-4 text-sm text-secText font-light leading-relaxed'>
                {review.review || "No review content provided."}
              </p>
            </div>
        </div>

      </div>
      </Link>

      <hr className='border-neutral-800 mb-3' />

      <div className='flex justify-between items-center'>
        <div className='text-left flex flex-col'>
            <Link to={`/user/${review.userid?._id || ''}`}>
            <div className='flex items-center gap-2'>
              <img className='md:h-10 md:w-10 w-8 h-8 rounded-full object-cover' src={review.userid?.avatarURL} alt={review.userid?.name} />
              <h1 className='text-white md:text-base text-sm font-medium hover:text-[#00e6e6] transition-colors'>
                @{review.userid?.username || "Anonymous"}
              </h1>
            </div>
            </Link>
            <div className='flex pt-1 pl-12'>
                <p className='text-secText text-xs'>
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                </p>
            </div>
        </div>
        
        <div className='flex items-center gap-4 p-2.5 justify-center md:text-base text-sm'>
            <div className='flex gap-x-1.5 items-center'>
                <button aria-label="Report"><MdOutlineReport className='text-2xl md:text-3xl text-white hover:text-red-500 transition-colors'/></button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Reviewcard;
