import React  from 'react'
import './Home.css';
// import { Link } from 'react-router-dom';
import Navbar from '../../components/navBar/Navbar';
import FeaturesSlider from './../../components/featureSection/Feature';
import Footer from './../../components/footer/Footer';
import craft1 from './../../assests/craft1.png';
import craft2 from './../../assests/craft2.png';
import craft3 from './../../assests/craft3.png';   
import craft4 from './../../assests/craft4.png';
import craft5 from './../../assests/craft5.png';
import craft6 from './../../assests/craft6.png';

const Home = () => {
    

  return (
    <div className='Home'>
        <Navbar className='Home-navBar'/>
        <FeaturesSlider  feature1={craft1} feature2={craft2} className='Home-featureSection'/>
        <FeaturesSlider feature1={craft3} feature2={craft4} className='Home-featureSection'/>
        <FeaturesSlider feature1={craft5} feature2={craft6} className='Home-featureSection'/>
        <Footer className='Home-footer'/>
    </div>
  )
}

export default Home