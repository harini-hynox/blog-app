import React from 'react'
import NavBar from './components/NavBar';
const About = () => {
  return (
    <div className='w-screen  h-screen bg-[#CDD6F6]'>
        <NavBar className="h-[25%]"/>
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Blog App</h1>
                <p className="text-gray-600 text-lg">
                    Welcome! This app allows you to create, explore, and search posts easily. 
                    It’s built with <strong>React</strong> and <strong>Tailwind CSS </strong> 
                    for a modern, responsive experience.
                </p>
            </section>

            {/* Mission Section */}
            <section className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-blue-600 mb-2">Our Mission</h2>
                <p className="text-gray-700">
                    Our mission is to provide a simple and intuitive platform for sharing ideas 
                    and learning from a community of passionate users. Whether you want to write 
                    your thoughts or read interesting posts, this app makes it easy and fun.
                </p>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 text-center">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Create Posts</h3>
                    <p className="text-gray-700">
                        Write your own posts with ease and share your knowledge with others.
                    </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 text-center">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Search & Explore</h3>
                    <p className="text-gray-700">
                        Quickly find posts you’re interested in with real-time search functionality.
                    </p>
                </div>
        
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 text-center">
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Responsive Design</h3>
                    <p className="text-gray-700">
                        Enjoy a clean and responsive layout on all devices, from mobile to desktop.
                    </p>
                </div>
            </section>
        </div> 

    </div>
  )
}

export default About