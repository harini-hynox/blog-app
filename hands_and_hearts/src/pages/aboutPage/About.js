import React from 'react'
import './About.css';
import { Link } from 'react-router-dom';
import  Navbar from '../../components/navBar/Navbar';
import Footer from '../../components/footer/Footer';

const About = () => {
  return (
    <div>
        <Navbar />
        <div className="about-page">
      {/* Intro Section */}
      <section className="about-intro">
        <h1>About Me</h1>
        <p>
          Hi, I’m <span className="highlight">Harini</span>, a passionate
          crafting freelancer who loves turning simple ideas into{" "}
          <span className="highlight">handmade creations</span> that bring joy
          and warmth. From decorative pieces to personalized gifts, every
          creation I make is crafted with love and attention to detail.
        </p>
      </section>

      {/* Taglines Section */}
      <section className="about-taglines">
        <h2>My Taglines</h2>
        <ul>
          <li>“Crafting stories, one creation at a time.”</li>
          <li>“Where imagination meets handmade beauty.”</li>
          <li>“Adding a personal touch to every piece.”</li>
        </ul>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>Mission</h2>
        <p>
          My mission is to <span className="highlight">make everyday moments
          more special through handcrafted designs</span>. I aim to deliver
          unique, customized creations that not only beautify spaces but also
          connect with people emotionally.
        </p>
      </section>

      {/* Vision Section */}
      <section className="about-vision">
        <h2>Vision</h2>
        <p>
          To become a trusted crafting partner who inspires creativity, spreads
          happiness, and builds a community that values the{" "}
          <span className="highlight">art of handmade work</span> in today’s
          fast-paced digital world.
        </p>
      </section>
    </div>
        <Footer />
    </div>
  )
}

export default About