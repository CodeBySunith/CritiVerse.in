import React from 'react'

const CategoryDesign = ({games}) => {
  return (
    <div className='flex flex-col content-center justify-center max-w-60 overflow-hidden bg-cardbg rounded-xl p-1'>

      <div className='grid grid-cols-2 gap-2 p-0.5 relative'>

        {games.map((e)=>{
            
        })}
        <div><img className='w-full aspect-square object-cover' src={games.ImgLink} alt="" /></div>
        <div><img className='w-full aspect-square object-cover' src={games.ImgLink1} alt="" /></div>
        <div><img className='w-full aspect-square object-cover' src={games.ImgLink2} alt="" /></div>
        <div><img className='w-full aspect-square object-cover' src={games.ImgLink3} alt="" /></div>

      </div>

      <div className='pb-2 pt-2 text-center text-2xl font-bold text-white'><h2>Action</h2></div>
    </div>
  )
}

export default CategoryCard
