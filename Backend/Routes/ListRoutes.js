const express = require("express")
const Router = express.Router()
const ListController = require("../Controllers/ListController.js")
const Auth = require("../Middlewares/middleWare.js")
const isBanned = require("../Middlewares/isBanned.js")

Router.get('/status/:_id', Auth, isBanned, ListController.GetGameTracking)

Router.post('/toggle-status/:_id', Auth, isBanned, ListController.ToggleStatus)

Router.post('/toggle-fav/:_id', Auth, isBanned, ListController.ToggleFavorite)

Router.get('/mylist',Auth,isBanned,ListController.GetMyList)

module.exports = Router
