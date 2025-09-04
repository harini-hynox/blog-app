import React from 'react'
// import './Footer.css';
import { Link } from 'react-router-dom';
// import twitter from './../../public/assests/twitter.png';
// import facebook from './../../public/assests/facebook.png';
// import linkedin from './../../public/assests/linkedin.png';
// import gmail from './../../public/assests/gmail.png';


const Footer = () => {
  return (
    <div className="flex flex-row justify-between items-center px-[4%] py-[1%] h-[100%] w-[100%] bg-[#B5EAD7]">
        <h3 className="font-trebuchet text-2xl font-semibold text-customGray">Copyright © 2025 Hands and Hearts</h3>
        <div className="flex flex-row justify-between w-[20%]">
            <Link to="https://x.com/"><img src='assets/twitter.png' alt="twitter" className="w-10 h-10"/></Link>
            <Link to="https://www.facebook.com/"><img src='/assets/facebook.png' alt="facebook" className="w-10 h-10"/></Link>
            <Link to="https://www.linkedin.com/"><img src='/assets/linkedin.png' alt="linkedin" className="w-10 h-10"/></Link>
            <Link to="/https://mail.google.com/mail/u/0/#inbox?compose=new"><img src='/assets/gmail.png' alt="gmail" className="w-10 h-10"/></Link>
        </div>
    </div>
  )
}

export default Footer