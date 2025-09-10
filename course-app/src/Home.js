import Navbar from "./components/Navbar";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  // Offer images (replace with actual banners)
  const offers = [
    { id: 1, img: "/assests/intro.png" },
    { id: 2, img: "/assests/AI.png" },
    { id: 3, img: "/assests/DA.png" },
    { id: 4, img: "/assests/CS.png" },
  ];

  // Example courses
  const courses = [
    { id: 1, title: "React for Beginners", desc: "Learn React step by step" },
    { id: 2, title: "JavaScript Mastery", desc: "Deep dive into JS concepts" },
    { id: 3, title: "UI/UX Basics", desc: "Design better user experiences" },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-[#eddac5]">
      {/* Navbar */}
      <Navbar className="h-[20%]" />

      <div className="flex flex-col items-center w-full p-8">
        {/* Welcome Line / Tagline */}
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Welcome to LearnHub
        </h1>
        <p className="text-center text-lg text-gray-600 font-semibold">
          Learn. Grow. Succeed.
        </p>

        {/* Hero Section with Slider */}
        <div className="w-full max-w-4xl mt-6">
          <Slider {...settings}>
            {offers.map((offer) => (
              <div key={offer.id}>
                <img
                  src={offer.img}
                  alt="offer banner"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Available Courses Section */}
        <section className="mt-10 w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Available Courses
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-300 p-6 rounded-lg text-center bg-white shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-2">{course.desc}</p>
                <Link to="/course">
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Explore
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
