import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import BuyCreadit from "./pages/BuyCreadit"
import Result from "./pages/Result"
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import Login from './components/Login'

const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-orange-50 to-orange-50'>
      <Navbar/>
      <Login/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/BuyCreadit' element={<BuyCreadit/>}/>
          <Route path='/Result' element={<Result/>}/>
        </Routes>
        <Footer/> 
    </div>
  )
}

export default App
