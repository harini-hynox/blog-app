import React from 'react'
// import './Feature.css';
const Feature = (Props) => {
    const {feature1 , feature2} = Props
  return (
    <div>
      <div className="flex flex-row justify-between items-center w-[100%] h-[100%] pt-[1%] px-[4%] bg-customLavender">
        <img src={feature1} alt='feature' className="w-[48%] h-full object-fill"/>
        <img src={feature2} alt='feature' className="w-[48%] h-full object-fill"/>
      </div>
    </div>
  )
}

export default Feature