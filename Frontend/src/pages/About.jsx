import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bgclr px-6 py-12">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About CritiVerse
            </h1>

            <p className="text-xl text-[#00e6e6] font-semibold mb-4">
              Every Game Has a Story. Every Gamer Has a Voice.
            </p>

            <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
              CritiVerse is a community-driven platform where gamers can
              discover new titles, track their gaming journey, and share
              honest reviews with fellow players around the world.
            </p>

          </div>

          <div className="bg-navbgclr border border-white/10 rounded-2xl p-8 md:p-12">

            <h2 className="text-3xl font-bold text-white mb-6">
              Welcome to CritiVerse
            </h2>

            <p className="text-gray-300 leading-8 mb-6">
              CritiVerse was created for gamers who want more than just a
              database of games. We believe that every player has a unique
              experience, perspective, and story worth sharing.
            </p>

            <p className="text-gray-300 leading-8 mb-10">
              Whether you're discovering your next favorite title,
              organizing your personal collection, or writing reviews to
              help others make informed choices, CritiVerse provides a
              place where every opinion matters and every game can be
              explored from different perspectives.
            </p>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-black/20 border border-white/10 rounded-xl p-6">

                <h3 className="text-[#00e6e6] text-xl font-bold mb-3">
                  🎮 Browse Games
                </h3>

                <p className="text-gray-400 leading-7">
                  Explore a growing collection of games featuring
                  detailed information, release dates, developers,
                  and cover artwork.
                </p>

              </div>

              <div className="bg-black/20 border border-white/10 rounded-xl p-6">

                <h3 className="text-[#00e6e6] text-xl font-bold mb-3">
                  ⭐ Build Your Collection
                </h3>

                <p className="text-gray-400 leading-7">
                  Save your favorite games, track titles you want
                  to play, and maintain a personalized gaming library.
                </p>

              </div>

              <div className="bg-black/20 border border-white/10 rounded-xl p-6">

                <h3 className="text-[#00e6e6] text-xl font-bold mb-3">
                  ✍️ Share Reviews
                </h3>

                <p className="text-gray-400 leading-7">
                  Publish reviews and share your gaming experiences
                  with a community that values honest opinions.
                </p>

              </div>

              <div className="bg-black/20 border border-white/10 rounded-xl p-6">

                <h3 className="text-[#00e6e6] text-xl font-bold mb-3">
                  👤 Personal Profiles
                </h3>

                <p className="text-gray-400 leading-7">
                  Manage your account, view your reviews, and keep
                  all your gaming activity organized in one place.
                </p>

              </div>

            </div>

            <div className="mt-12 pt-10 border-t border-white/10">

              <h2 className="text-3xl font-bold text-white mb-5">
                Our Mission
              </h2>

              <p className="text-gray-300 leading-8">
                Our mission is to create a platform where gamers can
                discover incredible games, express their opinions,
                and connect through meaningful discussions. We aim
                to make game discovery more personal by highlighting
                real player experiences and authentic reviews.
              </p>

            </div>

            <div className="mt-12 text-center">

              <div className="inline-block border border-[#00e6e6]/30 rounded-xl px-8 py-6 bg-[#00e6e6]/5">

                <p className="text-[#00e6e6] text-xl font-semibold italic">
                  "Every Game Has a Story. Every Gamer Has a Voice."
                </p>

                <p className="text-gray-500 mt-2">
                  — CritiVerse
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default About