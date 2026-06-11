import React from 'react'
import { Link } from 'react-router-dom'
import { FaXTwitter, FaGithub, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa6'

const Footer = () => {
  return (

        <footer className='min-w-full bg-navbgclr text-[#b3b3b3] '>

            <div className='flex flex-col items-center justify-center gap-3 p-5'>
                <div className=''>
                    <h2 className='text-lg md:text-2xl'>Follow CritiVerse on social</h2>
                </div>
                <div>
                    <ul className='flex gap-x-4 text-xl md:text-2xl'>

                        <a href="https://www.instagram.com"><li className='hover:text-[#00e6e6]'><FaInstagram/></li></a>
                        <a href="https://youtube.com"><li className='hover:text-[#00e6e6]'><FaYoutube/></li></a>
                        <a href="https://github.com"><li className='hover:text-[#00e6e6]'><FaGithub/></li></a>
                        <a href="https://www.facebook.com/"><li className='hover:text-[#00e6e6]'><FaFacebook/></li></a>
                        <a href="https://x.com"><li className='hover:text-[#00e6e6]'><FaXTwitter/></li></a>
                        
                    </ul>
                </div>

                <div>
                <ul className='flex md:flex-row flex-col justify-center items-center gap-2.5 text-xs md:text-lg'>
                    <Link to={'/privacypolicy'}><li className='hover:text-[#00e6e6]'>Privacy Policy</li></Link>
                    <Link to={'/terms&conditions'}><li className='hover:text-[#00e6e6]'>Terms and Conditions</li></Link>
                    <Link to={'/communityguidelines'}><li className='hover:text-[#00e6e6]'>Community Guidelines</li></Link>
                    <Link to={'/help'}><li className='hover:text-[#00e6e6]'>Help</li></Link>
                </ul>
                </div>
                <div>
                    <h3 className='text-sm md:text-xl'>A Thattikoottu Company</h3>
                </div>
                <p className='text-xs md:text-lg'>© 2024 - 2026 by CritiVerse.com, Inc.</p>
            </div>

        </footer>

  )
}

export default Footer
