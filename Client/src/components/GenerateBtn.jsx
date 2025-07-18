import React from 'react'
import { assets } from '../assets/assets'

const GenerateBtn = () => {
    return (
        <div className='pb-16 text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-14'>See the magic. Try now</h1>
            <button className='inline-flex  sm:text-lg text-white bg-black w-auto mt-8 px-12 py-3 m-auto items-center gap-2 hover:scale-105 transition-all duration-500 rounded-full '>
                Genarte Images
                <img src={assets.star_group} className='h-6' />
            </button>
        </div>
    )
}

export default GenerateBtn
