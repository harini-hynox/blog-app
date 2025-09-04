// Herosection.jsx
import React, { useState, useEffect } from 'react';
import poster1 from './../../assests/poster1.png';
import poster2 from './../../assests/poster2.png';
import poster3 from './../../assests/poster3.png';
import './Herosection.css';

const Herosection = ({ className = '', style }) => {
  const posters = [poster3, poster2, poster1];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % posters.length);
    }, 7000);
    return () => clearInterval(id);
  }, [posters.length]);

  return (
    <div className={`heroSection ${className}`} style={style}>
      <div
        className="heroSlider"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
      >
        {posters.map((img, idx) => (
          <div className="heroSlide" key={idx}>
            <img src={img} alt={`poster ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herosection;
