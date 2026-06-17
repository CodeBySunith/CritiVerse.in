const express = require('express')
const Router = express.Router()
const UserController = require('../Controllers/UserController.js')
const AuthMV = require('../Middlewares/middleWare.js')
const AuthMW = require('../Middlewares/middleWare.js')

Router.post('/signup',UserController.CreateUser)
Router.post('/login',UserController.LoginUser)
Router.post('/logout',UserController.LogoutUser)
Router.get('/getallusers',UserController.GetAllUsers)
Router.get('/usercount',UserController.UserCount)
Router.get('/verify',UserController.Verify)

Router.put('/toggleban/:id',AuthMV,UserController.ToggleBanUser)

Router.get('/profile', AuthMW, UserController.GetProfile);

Router.put('/profile/update', AuthMW, UserController.UpdateProfile);

Router.put('/profile/password', AuthMW, UserController.ChangePassword);

// Router.delete('/profile/delete', AuthMW, UserController.DeleteAccount);


module.exports = Router