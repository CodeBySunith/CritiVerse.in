import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { GetMyReviewsAPI } from '../api/ReviewAPI'

const MyReviews = () => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchReviews = async () => {

            try {

                const res = await GetMyReviewsAPI()

                if (res.details) {
                    setReviews(res.details)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        fetchReviews()

    }, [])

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-bgclr px-6 py-10">

                <div className="max-w-6xl mx-auto">

                    <div className="flex justify-between items-center mb-8">

                        <h1 className="text-3xl font-bold text-white">
                            My Reviews
                        </h1>

                        <div className="bg-navbgclr border border-[#00e6e6]/20 px-4 py-2 rounded-lg">

                            <span className="text-[#00e6e6] font-bold text-lg">
                                {reviews.length}
                            </span>

                            <span className="text-gray-400 ml-2">
                                Reviews
                            </span>

                        </div>

                    </div>

                    {loading && (

                        <div className="text-center text-white text-lg py-20">
                            Loading Reviews...
                        </div>

                    )}

                    {!loading && reviews.length === 0 && (

                        <div className="bg-navbgclr border border-white/10 rounded-xl p-12 text-center">

                            <h2 className="text-white text-2xl font-bold mb-3">
                                No Reviews Yet
                            </h2>

                            <p className="text-gray-400">
                                Start reviewing games to build your profile.
                            </p>

                        </div>

                    )}

                    <div className="grid gap-6">

                        {reviews.map((review, index) => (

                            <Link
                                key={index}
                                to={`/game/${review.gameId}`}
                            >

                                <div className="bg-navbgclr border border-white/10 rounded-xl overflow-hidden hover:border-[#00e6e6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">

                                    <div className="flex flex-col md:flex-row">

                                        <img
                                            src={review.coverImage}
                                            alt={review.title}
                                            className="w-full md:w-56 h-64 md:h-auto object-cover"
                                        />

                                        <div className="flex-1 p-6">

                                            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#00e6e6]/10 border border-[#00e6e6]/20 text-[#00e6e6] text-xs font-semibold uppercase">

                                                Your Review

                                            </div>

                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                                                <h2 className="text-white text-2xl font-bold">

                                                    {review.title}

                                                </h2>

                                                {review.rating && (

                                                    <div className="flex items-center gap-2 bg-black/30 border border-[#00e6e6]/20 px-3 py-2 rounded-lg">

                                                        <FaStar className="text-[#00e6e6]" />

                                                        <span className="text-[#00e6e6] font-bold">
                                                            {review.rating}/10
                                                        </span>

                                                    </div>

                                                )}

                                            </div>

                                            <p className="text-gray-300 leading-relaxed mt-5">

                                                {review.review ||
                                                    "No written review provided."}

                                            </p>

                                            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-2">

                                                <span className="text-gray-500 text-sm">

                                                    Created:
                                                    {" "}
                                                    {new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString()}

                                                </span>

                                                <span className="text-gray-500 text-sm">

                                                    Last Updated:
                                                    {" "}
                                                    {new Date(
                                                        review.updatedAt
                                                    ).toLocaleDateString()}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default MyReviews