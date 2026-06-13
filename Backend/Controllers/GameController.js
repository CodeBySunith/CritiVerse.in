const GameDB = require('../Models/GameModel.js');
const ReviewDB = require('../Models/ReviewModel.js')
const axios = require('axios');

const AddGame = async (req, res) => {
    const id = req.user._id;
    const { title, genre, platforms, releaseDate, developer, publisher, description, coverImage } = req.body;

  
    if (!title || !genre || !releaseDate || !developer || !publisher || !description || !coverImage) {
        return res.status(400).json({ message: "Missing required fields. Please fill out all mandatory details." });
    }

    try {
        const AlreadyAdded = await GameDB.findOne({ 
            title: { $regex: new RegExp(`^${title}$`, 'i') }, 
            developer: { $regex: new RegExp(`^${developer}$`, 'i') }, 
            releaseDate
        });

        if (AlreadyAdded) {
            return res.status(409).json({ message: "Game Already Exists! Try the edit option." });
        }

        const GameDetails = await GameDB.create({
            title,
            genre,
            platforms, 
            releaseDate,
            developer,
            publisher,
            description,
            coverImage,
            isImported: false,
            addedby: id,
            lastupdatedby: id
        });

        return res.status(201).json({ message: "Game manually added to archive.", details: GameDetails });

    } catch (e) {
        if (e.code === 11000) {
            return res.status(409).json({ message: "Database rejection: A game with this Title, Developer, and Date already exists." });
        }
        if (e.name === 'ValidationError') {
            return res.status(400).json({ msg: "Data format error", error: e.message });
        }
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
};

const UpdateGame = async (req, res) => {
    const userId = req.user._id;
    const gameId = req.params.id;
    
    const { title, genre, platforms, releaseDate, developer, publisher, description, coverImage } = req.body;

    try {
        if (title && developer && releaseDate) {
            const duplicateCheck = await GameDB.findOne({
                _id: { $ne: gameId },
                title: { $regex: new RegExp(`^${title}$`, 'i') },
                developer: { $regex: new RegExp(`^${developer}$`, 'i') },
                releaseDate
            });

            if (duplicateCheck) {
                return res.status(409).json({ 
                    message: "Update failed: Another game with this exact Title, Developer, and Date already exists." 
                });
            }
        }

        const updatedGame = await GameDB.findByIdAndUpdate(
            gameId,
            {
                $set: {
                    title,
                    genre,
                    platforms, 
                    releaseDate,
                    developer,
                    publisher,
                    description,
                    coverImage,
                    lastupdatedby: userId
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedGame) {
            return res.status(404).json({ message: "Game not found in the archive." });
        }

        return res.status(200).json({ message: "Game successfully updated", details: updatedGame });

    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Game ID format." });
        }
        if (e.code === 11000) {
            return res.status(409).json({ message: "Database rejection: Duplicate game detected." });
        }
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
};

const GetAllGames = async (req, res) => {
    try {
       
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;

        const { platform, genre, rating, year, sortBy } = req.query;
        
        let filter = {};

        if (platform) {
            filter.platforms = { $regex: new RegExp(platform, 'i') };
        }

        if (genre) {
            filter.genre = { $regex: new RegExp(genre, 'i') };
        }

        if (rating) {
            if (rating === 'below5') {
                filter.averageRating = { $lt: 5 };
            } else {
                const targetRating = parseFloat(rating);
                filter.averageRating = { 
                    $gte: targetRating, 
                    $lt: targetRating + 1 
                };
            }
        }

        if (year) {
            const parsedYear = parseInt(year);
            const startOfYear = new Date(`${parsedYear}-01-01T00:00:00.000Z`);
            const endOfYear = new Date(`${parsedYear}-12-31T23:59:59.999Z`);
            
            filter.releaseDate = {
                $gte: startOfYear,
                $lte: endOfYear
            };
        }

        let sortPipeline = { averageRating: -1 };

        if (sortBy) {
            switch (sortBy) {
                case 'rating_asc':
                    sortPipeline = { averageRating: 1 };
                    break;
                case 'rating_desc':
                    sortPipeline = { averageRating: -1 };
                    break;
                case 'year_asc':
                    sortPipeline = { releaseDate: 1 };
                    break;
                case 'year_desc':
                    sortPipeline = { releaseDate: -1 };
                    break;
                default:
                    sortPipeline = { averageRating: -1 };
            }
        }

        const [games, totalDocuments] = await Promise.all([
            GameDB.find(filter).sort(sortPipeline).skip(skip).limit(limit).lean(),
            GameDB.countDocuments(filter)
        ]);

        return res.status(200).json({
            games: games, 
            totalpages: Math.ceil(totalDocuments / limit) || 1
        });

    } catch (e) {
        return res.status(500).json({ 
            msg: "Failed to retrieve games", 
            error: e.message 
        });
    }
};

const GetNewGames = async (req, res) => {
    try {

        const games = await GameDB.find().sort({ createdAt: -1 }).limit(20);

        return res.status(200).json({games});
    } catch (e) {
        return res.status(500).json({ msg: "Failed to retrieve games", error: e.message });
    }
};

const GetTopGames = async (req, res) => {
    try {

        const games = await GameDB.find().sort({ averageRating: -1 }).limit(20);

        return res.status(200).json({games});
    } catch (e) {
        return res.status(500).json({ msg: "Failed to retrieve games", error: e.message });
    }
};


const GetSingleGame = async (req, res) => {
  try {
    const game = await GameDB.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ msg: "Game not found" });
    }
    return res.status(200).json(game);
  } catch (e) {
    return res.status(500).json({ msg: "Server error", error: e.message });
  }
};


const DeleteGame = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGame = await GameDB.findByIdAndDelete(id);

        if (!deletedGame) {
            return res.status(404).json({ message: "Game not found. It may have already been deleted." });
        }

        await ReviewDB.deleteMany({ gameid: id });

        return res.status(200).json({ 
            message: "Game successfully deleted from the archive.", 
            deletedTitle: deletedGame.title 
        });

    } catch (e) {
        if (e.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Game ID format." });
        }
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
};


const ImportGameFromRAWG = async (req, res) => {
    const id = req.user._id;
    const { rawgId } = req.body; 

    if (!rawgId) {
        return res.status(400).json({ message: "Missing RAWG ID." });
    }

    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${rawgId}`,{
            params: { key: process.env.RAWG_API_KEY } 
        });

        const rawgData = response.data;

        const developerName = rawgData.developers && rawgData.developers.length > 0 
            ? rawgData.developers[0].name : "Unknown Developer";
            
        const publisherName = rawgData.publishers && rawgData.publishers.length > 0 
            ? rawgData.publishers[0].name : "Unknown Publisher";

        const genreArray = rawgData.genres && rawgData.genres.length > 0
            ? rawgData.genres.map(g => g.name) : ["General"];

        const platformArray = rawgData.platforms && rawgData.platforms.length > 0
            ? rawgData.platforms.map(p => p.platform.name) : ["Unknown"];

        let safeDescription = rawgData.description_raw || "No description available.";
        if (safeDescription.length > 2000) {
            safeDescription = safeDescription.substring(0, 1995) + "...";
        }

        const AlreadyAdded = await GameDB.findOne({ 
            title: { $regex: new RegExp(`^${rawgData.name}$`, 'i') }, 
            developer: { $regex: new RegExp(`^${developerName}$`, 'i') }, 
            releaseDate: rawgData.released 
        });

        if (AlreadyAdded) {
            return res.status(409).json({ message: "This API game is already in the archive." });
        }

        const ImportedGame = await GameDB.create({
            rawgId: rawgData.id,
            isImported: true,
            title: rawgData.name,
            genre: genreArray,
            platforms: platformArray,
            releaseDate: rawgData.released,
            developer: developerName,
            publisher: publisherName,
            description: safeDescription,
            coverImage: rawgData.background_image,
            addedby: id,
            lastupdatedby: id
        });

        return res.status(201).json({ message: "Game successfully imported from RAWG.", details: ImportedGame });

    } catch (e) {
        if (e.code === 11000) {
            return res.status(409).json({ message: "Database rejection: This game has already been imported." });
        }
        if (e.name === 'ValidationError') {
            return res.status(400).json({ msg: "API data mapping error", error: e.message });
        }
        return res.status(500).json({ msg: "Failed to import from RAWG", error: e.message });
    }
};

const Search = async (req, res) => {
  try {
    const searchQuery = req.query.q; 

    if (!searchQuery) {
      return res.status(200).json([]);
    }

    const fuzzyRegex = searchQuery.split('').join('.*');


    const games = await GameDB.find({ 
      title: { $regex: fuzzyRegex, $options: 'i' } 
    }).select('_id title').limit(5);

    res.status(200).json(games);

  } catch (error) {
    console.error("Regex Search API Error:", error); 
    res.status(500).json({ message: "Server error during search" });
  }
};

const GameCount = async (req, res) => {
    try {
        const Gamecount = await GameDB.countDocuments()

        return res.status(200).json({Gamecount})
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
    
}

const GetAllGamesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const [games, totalDocuments] = await Promise.all([
      GameDB.find({})
        .skip(skip)
        .limit(limit)
        .lean(),

      GameDB.countDocuments({})
    ]);

    return res.status(200).json({
      games,
      totalpages: Math.ceil(totalDocuments / limit) || 1,
      page
    });

  } catch (e) {
    return res.status(500).json({
      msg: "Failed to retrieve games",
      error: e.message
    });
  }
};

module.exports = {
    AddGame,
    UpdateGame,
    GetAllGames,
    GetAllGamesAdmin,
    GetSingleGame,
    DeleteGame,
    ImportGameFromRAWG,
    GetNewGames,
    Search,
    GetTopGames,
    GameCount
};

