import Navbar from '../components/Navbar';
import FeaturesSlider from '../components/Feature';
import Footer from '../components/Footer';
// import craft1 from './../../../public/assests/craft1.png';
// import craft2 from './../../../public/assests/craft2.png';
// import craft3 from './../../../public/assests/craft3.png';   
// import craft4 from './../../../public/assests/craft4.png';
// import craft5 from './../../../public/assests/craft5.png';
// import craft6 from './../../../public/assests/craft6.png';

const Home = () => {
    

  return (
    <div className="flex flex-col w-full h-screen">
        <Navbar className="w-[100%] h-[35%]"/>
        <FeaturesSlider  feature1='/assets/craft1.png' feature2='/assets/craft2.png' className="w-[30%] h-[30%]"/>
        <FeaturesSlider feature1='/assets/craft3.png' feature2='/assets/craft4.png' className='w-[30%] h-[30%] '/>
        <FeaturesSlider feature1='/assets/craft5.png' feature2='./assets/craft6.png' className='w-[30%] h-[30%] '/>
        <Footer className='w-[105%] h-[15%] '/>
    </div>
  )
}

export default Home