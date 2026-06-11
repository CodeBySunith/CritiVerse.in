import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserRoute from './Routes/UserRoute'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import {AuthProvider} from '../src/Context/AuthContext'

const App = () => {
  return (
<BrowserRouter>
    <AuthProvider>
   
      {/* <Navbar/> */}
        <UserRoute/>
      {/* <Footer/> */}

    </AuthProvider>
</BrowserRouter>
  )
}

export default App
