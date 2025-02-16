import React from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center py-12 px-6 shadow-lg">
      <h1 className="text-5xl font-extrabold mb-4">Blast Off into the Ultimate Adventure!</h1>
      <p className="text-xl mb-6 max-w-2xl mx-auto">
        Embark on thrilling rocket rides, explore space missions, and experience the final frontier of family-friendly fun.
        Get ready for memories that will take you to the stars.
      </p>
      <div className="flex justify-center gap-6">
        <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg shadow-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
          Plan Your Space Mission
        </button>
        <button
          className="bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg shadow-xl hover:bg-yellow-600 transition-transform transform hover:scale-105"
          onClick={() => navigate("/events")}
        >
          Book Your Launch Tickets
        </button>
      </div>
    </div>
  );
};

const Homepage = () => {
  const featuredSections = [
    {
      title: "Rocket Rides",
      description: "Feel the rush of space travel with our exhilarating rocket coasters.",
      image: "/images/rocket-rides.webp",
    },
    {
      title: "Astronaut Adventures",
      description: "Experience out-of-this-world missions and activities perfect for explorers of all ages.",
      image: "/images/astronaut-adventures.webp",
    },
    {
      title: "Galactic Events",
      description: "Don’t miss out on our exclusive space missions, cosmic festivals, and seasonal galas.",
      image: "/images/galactic-events.webp",
    },
  ];

  const testimonials = [
    {
      quote: "Rocket Park is an intergalactic adventure for the whole family. We’ll be back for another mission!",
      author: "Heidi D.",
    },
    {
      quote: "Unforgettable space missions! The rides, food, and atmosphere were truly stellar.",
      author: "John P.",
    },
    {
      quote: "A fantastic space experience! Our kids had a blast exploring the galaxy.",
      author: "Aaron L.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroBanner />
      <section className="text-center my-12">
        <h2 className="text-4xl font-extrabold mb-6">Explore Rocket Park</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredSections.map((section, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
              <p className="text-gray-700 mb-4">{section.description}</p>
              <button
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
                onClick={() => navigate("/events")}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-700 text-white py-12">
        <h2 className="text-3xl font-extrabold text-center mb-6">What Our Space Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
              <p className="italic text-lg mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-right text-lg">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-white text-blue-900">
        <h2 className="text-4xl font-extrabold mb-6">Plan Your Space Mission Today</h2>
        <p className="text-xl mb-6">
          Whether you're ready to break the speed of light or relax among the stars, Rocket Park offers experiences for
          every explorer.
        </p>
        <button
          className="bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg shadow-xl hover:bg-yellow-600 transition-all duration-300"
          onClick={() => navigate("/events")}
        >
          Book Your Launch Tickets Now
        </button>
      </section>
    </div>
  );
};

export default Homepage;
