const express = require('express')
const Router = express.Router()
const ReviewController = require('../Controllers/ReviewController.js')
const Auth = require("../Middlewares/middleWare.js")
const isBanned = require("../Middlewares/isBanned.js")
const isAdmin = require('../Middlewares/RoleMW.js')

Router.post('/add/:_id',Auth,isBanned,ReviewController.AddReview)
Router.put('/update/:_id',Auth,isBanned,ReviewController.UpdateReview)
Router.delete('/deletereview/:_id',Auth,isBanned,ReviewController.DeleteMyReview)
Router.get('/myreview/:_id',Auth,ReviewController.ShowMyReview)
Router.get('/showallmyreviews',Auth,isBanned,ReviewController.ShowAllMyReview)

Router.get('/reviewcount',ReviewController.ReviewCount)
Router.get('/gamereviews/:_id',ReviewController.ShowGameReviews)
Router.get('/myallreviews',Auth,isBanned,ReviewController.ShowAllMyReview);

Router.post('/report',Auth,isBanned,ReviewController.reportReview);
Router.get('/checkreport/:reviewId',Auth,isBanned,ReviewController.checkReportStatus);
Router.get('/showreports',Auth,isBanned,ReviewController.getAllReviewReports);

Router.patch("/reportstatus", Auth, ReviewController.updateReportStatus);
Router.delete("/report/:reportId", Auth, ReviewController.deleteReport);



module.exports = Router