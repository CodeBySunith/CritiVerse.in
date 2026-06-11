import React from 'react'
import {FaXbox, FaPlaystation, FaAndroid, FaWindows, FaApple, FaLinux } from 'react-icons/fa6'

const CategoryCard = () => {
  return (
    <div className='grid grid-cols-6 text-8xl gap-5 text-white'>

      <div className='bg-navbgclr p-5'>
        <div className='flex justify-center'><FaXbox/></div>
        <div className='text-2xl text-secText pt-2 text-center'>XBox</div>
      </div>

      <div className='bg-navbgclr p-5'>
        <div className='flex justify-center'><FaPlaystation/></div>
        <div className='text-2xl text-secText pt-2 text-center'>Playstation</div>
      </div>

      <div className='bg-navbgclr p-5'>
        <div className='flex justify-center'><FaWindows/></div>
        <div className='text-2xl text-secText pt-2 text-center'>Windows</div>
      </div>

      <div className='bg-navbgclr p-5'>
        <div className='flex justify-center'><FaLinux/></div>
        <div className='text-2xl text-secText pt-2 text-center'>Linux</div>
      </div>

      <div className='bg-navbgclr p-5'>
        <div className='flex justify-center'><FaAndroid/></div>
        <div className='text-2xl text-secText pt-2 text-center'>Android</div>
      </div>

      <div className='bg-navbgclr p-5'>
        <div className='flex justify-center'><FaApple/></div>
        <div className='text-2xl text-secText pt-2 text-center'>Mac OS</div>
      </div>

    </div>
  )
}

export default CategoryCard
