import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex flex-row justify-center items-center gap-80 w-full h-[8%] bg-[#E6E6FA] px-4 py-2'>
        <Link to='/' className='no-underline text-black'><h4 className='font-bold font-sans text-2xl'>Home</h4></Link>
        <Link to='/about' className='no-underline text-black'><h4 className='font-bold font-sans text-2xl'>About</h4></Link>
        <Link to='/posts' className='no-underline text-black'><h4 className='font-bold font-sans text-2xl'>Posts</h4></Link>
    </div>
  )
}

export default NavBar