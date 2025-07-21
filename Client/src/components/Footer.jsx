import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='flex items-center justify-center gap-4 py-3 mt-20'>
            <div to="/ " className='flex gap-3'>
                <img src={assets.logo_icon} className='w-28 sm:w-32 lg:w-10' />
                <p className='text-3xl font-semibold'>Snapsage</p>
            </div>
            <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden '>All right reserved. Copyright @Snapsage</p>

            <div className='flex gap-2.5'>
                <img src={assets.facebook_icon} width={35} alt="" />
                <img src={assets.instagram_icon} width={35} alt="" />
                <img src={assets.twitter_icon} width={35} alt="" />
            </div>
        </div>
    )
}

export default Footer
