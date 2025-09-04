import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='navBar'>
        <h3 className='navElement'>Hands and Hearts</h3>
        <h3 className='navElement'><Link to="/" className='navRef'>Home</Link></h3>
        <h3 className='navElement'><Link to="/about" className='navRef'>About</Link></h3>
        <h3 className='navElement'><Link to="/contact" className='navRef'>Contact</Link></h3>
    </div>
  )
}

export default Navbar