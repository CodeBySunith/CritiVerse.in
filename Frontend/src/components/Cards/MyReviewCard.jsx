import React from 'react'

const Reviewcard = ({ review }) => {

  if (!review) return null;

  return (
    <div className='flex flex-col max-w-full bg-navbgclr p-3 rounded-lg border border-white/5 shadow-md'>

       <div className='flex gap-4 pb-5'>

        <div className='flex flex-col gap-y-1.5 p-2.5 w-full'>
      
            <div>
              <p className='line-clamp-4 text-sm text-secText font-light leading-relaxed'>
                {review.review || "No review content provided."}
              </p>
            </div>
        </div>

      </div>

      <hr className='border-neutral-800 mb-3' />

      <div className='flex justify-between items-center'>
        <div className='text-left flex flex-col'>

            <div className='flex items-center gap-2'>
              <img className='md:h-10 md:w-10 w-8 h-8 rounded-full object-cover' src={review.userid?.avatarURL} alt={review.userid?.name} />
              <h1 className='text-white md:text-base text-sm font-medium'>
                {review.userid?.name || "Anonymous"}
              </h1>
            </div>
          
            <div className='flex pt-1 pl-12'>
                <p className='text-secText text-xs'>
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                </p>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Reviewcard;
