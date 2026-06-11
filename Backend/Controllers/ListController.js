const ListDB = require('../Models/ListModel');

GetGameTracking = async (req, res) => {
    try {
        const track = await ListDB.findOne({ userid: req.user._id, gameid: req.params._id });
        return res.status(200).json({
            success: true,
            status: track ? track.status : null,
            isFavorite: track ? track.isFavorite : false
        });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
};


ToggleStatus = async (req, res) => {
    const { targetStatus } = req.body; 
    const gameId = req.params._id;
    const userId = req.user._id;

    try {
        let track = await ListDB.findOne({ userid: userId, gameid: gameId });

        if (!track) {
            
            track = await ListDB.create({ userid: userId, gameid: gameId, status: targetStatus });
        } else if (track.status === targetStatus) {
            
            track.status = null;
        } else {
            
            track.status = targetStatus;
        }

        if (!track.status && !track.isFavorite) {
            await ListDB.findByIdAndDelete(track._id);
            return res.status(200).json({ success: true, status: null, isFavorite: false });
        }

        await track.save();
        return res.status(200).json({ success: true, status: track.status, isFavorite: track.isFavorite });

    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
};


ToggleFavorite = async (req, res) => {
    const gameId = req.params._id;
    const userId = req.user._id;

    try {
        let track = await ListDB.findOne({ userid: userId, gameid: gameId });

        if (!track) {
            track = await ListDB.create({ userid: userId, gameid: gameId, isFavorite: true });
        } else {
            track.isFavorite = !track.isFavorite;
        }

        if (!track.status && !track.isFavorite) {
            await ListDB.findByIdAndDelete(track._id);
            return res.status(200).json({ success: true, status: null, isFavorite: false });
        }

        await track.save();
        return res.status(200).json({ success: true, status: track.status, isFavorite: track.isFavorite });

    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
};

const GetMyList = async (req, res) => {

    try {

        const list = await ListDB.find({
            userid: req.user._id
        })
        .populate('gameid');

        return res.status(200).json({
            success: true,
            list
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            error: e.message
        });

    }

};


module.exports ={GetGameTracking,ToggleStatus,ToggleFavorite,GetMyList}