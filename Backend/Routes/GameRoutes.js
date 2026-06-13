const express = require("express")
const Router = express.Router()
const Gamecontroller = require("../Controllers/GameController.js")
const Auth = require("../Middlewares/middleWare.js")
const RoleMW = require("../Middlewares/RoleMW.js")
const isBanned = require("../Middlewares/isBanned.js")

Router.post('/addgame',Auth,isBanned,RoleMW(["admin","moderator"]),Gamecontroller.AddGame)

Router.get('/search',Gamecontroller.Search)

Router.put('/updategame/:id',Auth,isBanned,RoleMW(["admin","moderator"]),Gamecontroller.UpdateGame)

Router.post('/addgamesAPI',Auth,isBanned,RoleMW(["admin","moderator"]),Gamecontroller.ImportGameFromRAWG)

Router.get('/showallgames',Gamecontroller.GetAllGames)
Router.get('/showallgamesadmin',Gamecontroller.GetAllGamesAdmin)
Router.get('/newreleases',Gamecontroller.GetNewGames)
Router.get('/topratedgames',Gamecontroller.GetTopGames)
Router.get('/singlegame/:id',Gamecontroller.GetSingleGame)

Router.delete('/deletegame/:id',Auth,isBanned,RoleMW(["admin","moderator"]),Gamecontroller.DeleteGame)

Router.get('/gamecount',Gamecontroller.GameCount)








module.exports = Router