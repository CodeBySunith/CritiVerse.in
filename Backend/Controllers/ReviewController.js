const GameDB = require('../Models/GameModel.js');
const ReviewDB = require('../Models/ReviewModel.js');
const ReviewReport = require('../Models/ReportModel.js')
const mongoose = require('mongoose');

const ShowMyReview = async (req, res) => {
    const { _id } = req.params;
    const userID = req.user._id;

    try {
        const Review = await ReviewDB.findOne({ userid: userID, gameid: _id })

        if (!Review) {
            return res.status(404).json({ msg: "Not Reviewed yet" });
        }

        return res.status(200).json({ msg: "Your Review:", review: Review });
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
}


const ShowAllMyReview = async (req,res) => {

    const userID = req.user._id;

    try{
const Review = await ReviewDB.find({ userid: userID }).populate('gameid', 'title coverImage');
        if(!Review || Review.length === 0){
            return res.status(404).json({msg: "No Reviews"})
        }

        const ReviewsList = Review.map((x) => ({
    gameId: x.gameid?._id,
    title: x.gameid?.title || "Unknown Game",
    coverImage: x.gameid?.coverImage || "",
    review: x.review,
    rating: x.rating,
    createdAt: x.createdAt,
    updatedAt: x.updatedAt
}))


        return res.status(200).json({msg: "Your Review:",details:  ReviewsList})
    }catch(e){
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
}


const recalculateGameRating = async (gameId) => {
    const stats = await ReviewDB.aggregate([
        { $match: { gameid: new mongoose.Types.ObjectId(gameId), rating: { $ne: null } } },
        { $group: { _id: '$gameid', avgRating: { $avg: '$rating' }, total: { $sum: 1 } } }
    ]);

    if (stats.length > 0) {
        await GameDB.findByIdAndUpdate(gameId, {
            averageRating: parseFloat(stats[0].avgRating.toFixed(1)),
            totalReviews: stats[0].total
        });
    } else {
        await GameDB.findByIdAndUpdate(gameId, { averageRating: 0, totalReviews: 0 });
    }
};

AddReview = async (req, res) => {
    const { review, rating } = req.body;
    const { _id } = req.params;
    const userID = req.user._id;

    try {
        const alreadyReviewed = await ReviewDB.findOne({ userid: userID, gameid: _id });
        if (alreadyReviewed) {
            return res.status(400).json({ success: false, msg: "You already reviewed this game" });
        }

        const newReview = await ReviewDB.create({
            userid: userID,
            gameid: _id,
            review: review || "",
            rating: rating || null
        });

        if (rating) await recalculateGameRating(_id);

        return res.status(201).json({ success: true, msg: "Rating added", details: newReview });
    } catch (e) {
        return res.status(500).json({ success: false, msg: "Server Error", error: e.message });
    }
};

UpdateReview = async (req, res) => {
    const { review, rating } = req.body;
    const { _id } = req.params;
    const userID = req.user._id;

    try {
        const currentReview = await ReviewDB.findOne({ userid: userID, gameid: _id });
        if (!currentReview) {
            return res.status(404).json({ success: false, msg: "Review not found" });
        }

        if (review !== undefined) currentReview.review = review;
        if (rating !== undefined) currentReview.rating = rating;

        await currentReview.save();
        await recalculateGameRating(_id);

        return res.status(200).json({ success: true, msg: "Rating Updated", details: currentReview });
    } catch (e) {
    console.log(e);

    return res.status(500).json({
        success: false,
        msg: "Server Error",
        error: e.message
    });
}
};



const DeleteMyReview = async (req, res) => {
  const gameId = req.params._id;
  const userId = req.user._id;

  try {
    const deletedReview = await ReviewDB.findOneAndDelete({
      userid: userId,
      gameid: gameId,
    });

    if (!deletedReview) {
      return res.status(404).json({
        msg: "Review not found",
      });
    }

    await recalculateGameRating(gameId);

    return res.status(200).json({
      msg: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error: error.message,
    });
  }
};

const ShowNewReviews = async (req,res) => {

    try {
        
        const newReviews = await ReviewDB.find().sort({createdAt : -1}).limit(6).populate('userid', 'username avatarURL').populate('gameid', 'title coverImage');

        if(!newReviews || newReviews.length === 0){
            return res.status(404).json({msg: "No Reviews yet"})
        }

        return res.status(200).json({newReviews})
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
}

const ReviewCount = async (req, res) => {
    try {
        const Reviewcount = await ReviewDB.countDocuments()

        return res.status(200).json({Reviewcount})
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
    
}

const ShowGameReviews = async (req, res) => {
    const { _id } = req.params;

    try {
        const gameReviews = await ReviewDB.find({ gameid: _id })
            .sort({ createdAt: -1 })
            .populate('userid', 'username avatarURL')
            .populate('gameid', 'title coverImage');

        return res.status(200).json({ gameReviews: gameReviews || [] });
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
};

const reportReview = async (req, res) => {
  try {
    const { reviewId, reason } = req.body;

    const report = await ReviewReport.create({
      reporterId: req.user._id,
      reviewId,
      reason,
    });

    res.status(201).json({
      msg: "Reported successfully",
      report,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to report review" });
  }
};

const getReviewReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      ReviewReport.find()
        .populate("reporterId", "username email")
        .populate({
          path: "reviewId",
          populate: {
            path: "userid",
            select: "username email",
          },
        })
        .sort({ createdAt: -1 }) // ✅ sort BEFORE pagination (important)
        .skip(skip)
        .limit(limit),

        
        
      ReviewReport.countDocuments(),
    ]);
    

    return res.status(200).json({
      reports,
      totalpages: Math.ceil(total / limit) || 1,
      page,
    });
  } catch (err) {
    console.error("getReviewReports error:", err);
    return res.status(500).json({ msg: "Failed to fetch reports" });
  }
};



module.exports = { AddReview, DeleteMyReview, UpdateReview, ShowMyReview, ShowAllMyReview,ShowNewReviews,ReviewCount,ShowGameReviews, reportReview, getReviewReports};
