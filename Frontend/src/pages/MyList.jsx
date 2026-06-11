import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { GetMyListAPI } from '../api/ListAPI'

const MyList = () => {

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {

        const fetchList = async () => {

            try {

                const res = await GetMyListAPI()

                if (res.success) {
                    setGames(res.list)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        fetchList()

    }, [])

    const filteredGames = games.filter((item) => {

        if (filter === 'all') return true

        if (filter === 'favorites')
            return item.isFavorite

        if (filter === 'want')
            return item.status === 'want'

        if (filter === 'played')
            return item.status === 'played'

        return true

    })

    const favoriteCount = games.filter(
        game => game.isFavorite
    ).length

    const wantCount = games.filter(
        game => game.status === 'want'
    ).length

    const playedCount = games.filter(
        game => game.status === 'played'
    ).length

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-bgclr px-6 py-10">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-white text-3xl font-bold mb-8">
                        My Game Collection
                    </h1>


                    <div className="flex flex-wrap gap-3 mb-10">

                        <button
                            onClick={() => setFilter('all')}
                            className={`px-5 py-2 rounded-md font-bold border transition-all duration-300
                            ${
                                filter === 'all'
                                ? 'bg-[#00e6e6] text-[#1a1e24] border-[#00e6e6]'
                                : 'bg-transparent border-[#00e6e6] text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#1a1e24]'
                            }`}
                        >
                            All
                        </button>

                        <button
                            onClick={() => setFilter('favorites')}
                            className={`px-5 py-2 rounded-md font-bold border transition-all duration-300
                            ${
                                filter === 'favorites'
                                ? 'bg-[#ff007f] text-white border-[#ff007f]'
                                : 'bg-transparent border-[#ff007f] text-[#ff007f] hover:bg-[#ff007f] hover:text-white'
                            }`}
                        >
                            Favorites
                        </button>

                        <button
                            onClick={() => setFilter('want')}
                            className={`px-5 py-2 rounded-md font-bold border transition-all duration-300
                            ${
                                filter === 'want'
                                ? 'bg-[#00e6e6] text-[#1a1e24] border-[#00e6e6]'
                                : 'bg-transparent border-[#00e6e6] text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#1a1e24]'
                            }`}
                        >
                            Want
                        </button>

                        <button
                            onClick={() => setFilter('played')}
                            className={`px-5 py-2 rounded-md font-bold border transition-all duration-300
                            ${
                                filter === 'played'
                                ? 'bg-[#00e6e6] text-[#1a1e24] border-[#00e6e6]'
                                : 'bg-transparent border-[#00e6e6] text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#1a1e24]'
                            }`}
                        >
                            Played
                        </button>

                    </div>

                    {loading && (
                        <div className="text-center text-white text-lg">
                            Loading Your Collection...
                        </div>
                    )}


                    {!loading && filteredGames.length === 0 && (
                        <div className="text-center text-gray-400 text-lg">
                            No games found.
                        </div>
                    )}


                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {filteredGames.map((item) => (

                            <Link
                                key={item._id}
                                to={`/games/${item.gameid._id}`}
                            >

                                <div className="bg-navbgclr rounded-xl overflow-hidden border border-white/5">

                                    <img
                                        src={item.gameid.coverImage}
                                        alt={item.gameid.title}
                                        className="w-full h-64 object-cover"
                                    />

                                    <div className="p-4">

                                        <h2 className="text-white font-bold text-lg line-clamp-1">
                                            {item.gameid.title}
                                        </h2>

                                        <div className="mt-3">

                                        <p className="text-gray-400 text-sm">
                                            {item.gameid.releaseDate
                                                ? new Date(item.gameid.releaseDate).getFullYear()
                                                : 'N/A'}
                                        </p>

                                        {filter === 'all' && (
                                            <div className="flex flex-wrap gap-2 mt-2">

                                                {item.isFavorite && (
                                                    <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded">
                                                        ♥ Favorite
                                                    </span>
                                                )}

                                                {item.status === 'want' && (
                                                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                                                        Want To Play
                                                    </span>
                                                )}

                                                {item.status === 'played' && (
                                                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                                        Played
                                                    </span>
                                                )}

                                            </div>
                                        )}

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

export default MyList