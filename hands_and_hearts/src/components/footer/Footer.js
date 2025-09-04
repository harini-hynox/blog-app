import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import twitter from './../../assests/twitter.png';
import facebook from './../../assests/facebook.png';
import linkedin from './../../assests/linkedin.png';
import gmail from './../../assests/gmail.png';
// import phone from './../../assests/phone.png';

const Footer = () => {
  return (
    <div className='footer'>
        <h3 className='footerText'>Copyright © 2025 Hands and Hearts</h3>
        <div className='footerIcons'>
            <Link to="https://x.com/" className='footerRef'><img src={twitter} alt="twitter" className='footerImage'/></Link>
            <Link to="https://www.facebook.com/" className='footerRef'><img src={facebook} alt="facebook" className='footerImage'/></Link>
            <Link to="https://www.linkedin.com/" className='footerRef'><img src={linkedin} alt="linkedin" className='footerImage'/></Link>
            <Link to="/https://mail.google.com/mail/u/0/#inbox?compose=new" className='footerRef'><img src={gmail} alt="gmail" className='footerImage'/></Link>
            {/* <Link to="/" className='footerRef'><img src={phone} alt="phone" className='footerImage'/></Link> */}
        </div>
    </div>
  )
}

export default Footer