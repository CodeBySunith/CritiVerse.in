const express = require('express')
const Router = express.Router()
const ReviewController = require('../Controllers/ReviewController.js')
const Auth = require("../Middlewares/middleWare.js")
const isBanned = require("../Middlewares/isBanned.js")

Router.post('/add/:_id',Auth,isBanned,ReviewController.AddReview)
Router.put('/update/:_id',Auth,isBanned,ReviewController.UpdateReview)
Router.delete('/deletereview/:_id',Auth,isBanned,ReviewController.DeleteReview)
Router.get('/myreview/:_id',Auth,ReviewController.ShowMyReview)
Router.get('/showallmyreviews',Auth,isBanned,ReviewController.ShowAllMyReview)
Router.get('/newreviews',ReviewController.ShowNewReviews)
Router.get('/reviewcount',ReviewController.ReviewCount)
Router.get('/gamereviews/:_id',ReviewController.ShowGameReviews)
Router.get('/myallreviews',Auth,isBanned,ReviewController.ShowAllMyReview);



module.exports = Router