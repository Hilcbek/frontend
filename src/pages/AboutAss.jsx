import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineLink} from 'react-icons/ai'
export const AboutAss = () => {
  return (
    <div className='p-16 drop text-white'>
        <h1 className='text-4xl'>BEREKET ALEMAYEHU</h1>
        <p>OOSE assignment MVC implemnation</p>
        <Link className='my-2 italic hover:text-red-500 cursor-pointer flex items-center justify-start' to={'mailto:balemayehu07@gmail.com'}><AiOutlineLink className='mr-3 text-2xl' />balemayehu07@gmail.com</Link>
    </div>
  )
}
