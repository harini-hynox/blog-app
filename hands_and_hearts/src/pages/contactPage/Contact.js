import React from 'react'
import './Contact.css';
import { Link } from 'react-router-dom';
import  Navbar from '../../components/navBar/Navbar';
import Footer from '../../components/footer/Footer';
import emailIcon from './../../assests/gmail.png';
import phoneIcon from './../../assests/phone.png';
import locationIcon from './../../assests/location.png';
const Contact = () => {
  return (
    <div>
        <Navbar />
        <div className="contact-page">
      {/* Catchy Line */}
      <section className="contact-header">
        <h1>Let’s Create Something Beautiful Together ✨</h1>
        <p>
          I’d love to hear from you! Whether it’s a custom order, collaboration,
          or just a hello, feel free to reach out.
        </p>
      </section>

      {/* Contact Details */}
      <section className="contact-details">
        <div className="contact-card">
          <img src={emailIcon} alt="email" className="icon" />
          <h3>Email</h3>
          <p>harini.crafts@gmail.com</p>
        </div>

        <div className="contact-card">
          <img src={phoneIcon} alt="phone" className="icon" />
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className="contact-card">
          <img src={locationIcon} alt="location" className="icon" />
          <h3>Location</h3>
          <p>Coimbatore, Tamil Nadu, India</p>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send Me a Message</h2>
        <form className="contact-form" action={`mailto:admin.crafts@gmail.com`} method="POST" encType="text/plain">
          <input type="text" name="Name" placeholder="Your Name" required />
          <input type="email" name="Email" placeholder="Your Email" required />
          <input type="text" name="Subject" placeholder="Subject" />
          <textarea name="Message" placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Working Hours */}
      <section className="working-hours">
        <p>Available: Mon – Sat, 10 AM – 6 PM</p>
      </section>
    </div>
        <Footer />
    </div>
  )
}

export default Contact