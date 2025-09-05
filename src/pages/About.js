import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="bg-customLavender text-customGray font-[Trebuchet MS] leading-relaxed">
      <Navbar className="w-[100%] h-[35%]"/>
      
      <div className="px-8 py-10">

        {/* Intro Section */}
        <section className="text-center mb-8">
          <h1 className="text-[2.5rem] mb-5 text-[#A66FB5]">About Me</h1>
          <p className="text-[1.2rem] max-w-[700px] mx-auto">
            Hi, I’m <span className="text-customOrange font-bold">Harini</span>, a passionate
            crafting freelancer who loves turning simple ideas into{" "}
            <span className="text-customOrange font-bold">handmade creations</span> that bring joy
            and warmth. From decorative pieces to personalized gifts, every
            creation I make is crafted with love and attention to detail.
          </p>
        </section>

        {/* Taglines Section */}
        <section className="mb-10 text-center">
          <h2 className="text-[2rem] mb-4 text-[#A66FB5]">My Taglines</h2>
          <ul className="list-none p-0">
            <li className="my-2 text-[1.1rem] italic text-[#555]">“Crafting stories, one creation at a time.”</li>
            <li className="my-2 text-[1.1rem] italic text-[#555]">“Where imagination meets handmade beauty.”</li>
            <li className="my-2 text-[1.1rem] italic text-[#555]">“Adding a personal touch to every piece.”</li>
          </ul>
        </section>

        {/* Mission Section */}
        <section className="mb-10 text-center">
          <h2 className="text-[2rem] mb-4 text-[#A66FB5]">Mission</h2>
          <p className="text-[1.1rem] max-w-[700px] mx-auto">
            My mission is to <span className="text-customOrange font-bold">make everyday moments
            more special through handcrafted designs</span>. I aim to deliver
            unique, customized creations that not only beautify spaces but also
            connect with people emotionally.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-10 text-center">
          <h2 className="text-[2rem] mb-4 text-[#A66FB5]">Vision</h2>
          <p className="text-[1.1rem] max-w-[700px] mx-auto">
            To become a trusted crafting partner who inspires creativity, spreads
            happiness, and builds a community that values the{" "}
            <span className="text-customOrange font-bold">art of handmade work</span> in today’s
            fast-paced digital world.
          </p>
        </section>

      </div>

      <Footer className="w-[100%] h-[15%] "/>
    </div>
  )
}

export default About;
