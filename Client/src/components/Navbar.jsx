import React, { useContext } from 'react'
import {assets} from "../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const {user,setShowLogin,logout,credit}=useContext(AppContext)
    const navigate=useNavigate()


    return (
        <div className='flex items-center justify-between py-4'>
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <img src={assets.logo_icon} className="w-10 sm:w-12 md:w-10" />
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap">Snapsage</p>
            </Link>

            <div>
                {user ?
                    <div className='flex items-center gap-2 sm:gap-3'>

                        <button onClick={()=>navigate("/BuyCreadit")} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                            <img src={assets.credit_star} className="w-5" />
                            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
                        </button>

                        <p className='ext-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                        <div className='relative group'>
                            <img src={assets.profile_icon} className="w-10 drop-shadow" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    :
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={()=>navigate("/BuyCreadit")} className='cursor-pointer'>Pricing</p>
                        <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full' >Login</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar