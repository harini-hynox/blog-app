import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/navBar/Navbar';
import Footer from '../../components/footer/Footer';
import emailIcon from './../../assests/gmail.png';
import phoneIcon from './../../assests/phone.png';
import locationIcon from './../../assests/location.png';

const Contact = () => {
  return (
    <div className="bg-[#F3E8FF] text-customGray font-[Trebuchet MS] text-center ">
      <Navbar className="w-[100%] h-[35%]"/>

      {/* Header Section */}
      <section className="mb-10">
        <h1 className="text-[2.2rem] mb-4 text-[#A66FB5]">Let’s Create Something Beautiful Together ✨</h1>
        <p className="text-[1.2rem] max-w-[25rem] mx-auto mb-10 text-[#555]">
          I’d love to hear from you! Whether it’s a custom order, collaboration,
          or just a hello, feel free to reach out.
        </p>
      </section>

      {/* Contact Details */}
      <section className="flex flex-wrap justify-center gap-8 mb-10">
        <div className="bg-white p-5 md:p-8 rounded-xl shadow-md w-[250px] transition-transform duration-300 hover:-translate-y-1">
          <img src={emailIcon} alt="email" className="w-10 h-10 mb-2 mx-auto" />
          <h3 className="mb-1 text-customGray">Email</h3>
          <p className="text-[1rem] text-[#666]">harini.crafts@gmail.com</p>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-xl shadow-md w-[250px] transition-transform duration-300 hover:-translate-y-1">
          <img src={phoneIcon} alt="phone" className="w-10 h-10 mb-2 mx-auto" />
          <h3 className="mb-1 text-customGray">Phone</h3>
          <p className="text-[1rem] text-[#666]">+91 98765 43210</p>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-xl shadow-md w-[250px] transition-transform duration-300 hover:-translate-y-1">
          <img src={locationIcon} alt="location" className="w-10 h-10 mb-2 mx-auto" />
          <h3 className="mb-1 text-customGray">Location</h3>
          <p className="text-[1rem] text-[#666]">Coimbatore, Tamil Nadu, India</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-10">
        <h2 className="text-[1.8rem] mb-5 text-[#A66FB5]">Send Me a Message</h2>
        <form className="max-w-[600px] mx-auto flex flex-col gap-4" action={`mailto:admin.crafts@gmail.com`} method="POST" encType="text/plain">
          <input type="text" name="Name" placeholder="Your Name" required className="p-3 rounded-lg border border-gray-300 text-[1rem] font-[Trebuchet MS]" />
          <input type="email" name="Email" placeholder="Your Email" required className="p-3 rounded-lg border border-gray-300 text-[1rem] font-[Trebuchet MS]" />
          <input type="text" name="Subject" placeholder="Subject" className="p-3 rounded-lg border border-gray-300 text-[1rem] font-[Trebuchet MS]" />
          <textarea name="Message" placeholder="Your Message" rows="5" required className="p-3 rounded-lg border border-gray-300 text-[1rem] font-[Trebuchet MS]"></textarea>
          <button type="submit" className="p-3 rounded-xl bg-[#FFD6A5] font-bold text-[1rem] hover:bg-customOrange transition-colors duration-300 cursor-pointer">
            Send Message
          </button>
        </form>
      </section>

      {/* Working Hours */}
      <section>
        <p className="text-[1rem] text-[#555]">Available: Mon – Sat, 10 AM – 6 PM</p>
      </section>

      <Footer className="w-[100%] h-[25%]"/>
    </div>
  )
}

export default Contact;
