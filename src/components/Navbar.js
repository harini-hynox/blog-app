import React from 'react'
import { Link } from 'react-router-dom';
// import './Navbar.css';
const Navbar = () => {
  return (
    // display:flex;
    // flex-direction:row;
    // justify-content: space-between;
    // height: 15%;
    // width: auto;
    // background-color: #CDB4DB;
    // padding: 2% 5% 2% 4%;
    <div className="flex flex-row justify-between h-[100%] w-auto bg-customPurple pt-[2%] pr-[5%] pb-[2%] pl-[4%]">
        <h3 className="font-trebuchet text-customGray text-2xl">Hands and Hearts</h3>
        <h3 className="font-trebuchet text-customGray text-2xl"><Link to="/" className="no-underline text-customGray">Home</Link></h3>
        <h3 className="font-trebuchet text-customGray text-2xl"><Link to="/about" className="no-underline text-customGray">About</Link></h3>
        <h3 className="font-trebuchet text-customGray text-2xl"><Link to="/contact" className="no-underline text-customGray">Contact</Link></h3>
    </div>
  )
}

export default Navbar