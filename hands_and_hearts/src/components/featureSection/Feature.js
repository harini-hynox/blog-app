import React from 'react'
import './Feature.css';
const Feature = (Props) => {
    const {feature1 , feature2} = Props
  return (
    <div>
        <div className='featureSection'>
            <img src={feature1} alt='feature' className='featureImage'/>
            <img src={feature2} alt='feature' className='featureImage'/>
        </div>
    </div>
  )
}

export default Feature