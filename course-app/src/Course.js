import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card';
const Course = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-[#eddac5]">
        <Navbar className="h-[20%]" />
        <div className="flex gap-6 px-8 py-4 flex-wrap justify-center h-[40%]">
            <Card
                image='/assests/AI_Card.png'
                name="Artificial Intelligence for Beginners"
                duration=" 70 hours"
            />
            <Card
                image='/assests/CC_Card.png'
                name="Advanced Cloud Computing"
                duration="60 hours"
            />
            </div>
            <div className="flex gap-6 px-8 py-4 flex-wrap justify-center h-[40%]">
            <Card
                image='/assests/CS_Card.png'
                name="Cyber Security"
                duration="50 hours"
            />
            <Card
                image='/assests/JP_Card.png'
                name="Java Programming"
                duration="50 hours"
            />
            </div>
            <div className="flex gap-6 px-8 py-4 flex-wrap justify-center h-[40%]">
            <Card
                image='/assests/Web_Card.png'
                name="Full Stack Web Development"
                duration="75 hours"
            />
        </div>
    </div>
  )
}

export default Course