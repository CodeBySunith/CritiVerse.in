import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import BrowseGames from '../pages/BrowseGames'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import Home from '../pages/Home'
import GameCard from '../components/Cards/GameCard'
import GamePage from '../pages/GamePage'
import ProfilePage from '../pages/ProfilePage'
import MyList from '../pages/MyList'
import MyReviews from '../pages/MyReviews'
import About from '../pages/About'

const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/browse' element={<BrowseGames/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element ={<Login/>} />
        <Route path='/signup' element ={<Signup/>} />

        <Route path='/games/:id' element={<GamePage/>}/>

        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/mylist' element={<MyList/>} />

        <Route path='/myreviews' element={<MyReviews/>} />

        <Route path='/about' element={<About/>} />
      </Routes>
    </div>
  )
}

export default UserRoute
