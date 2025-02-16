const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-center text-white text-center py-32 px-6 shadow-lg"
      style={{
        backgroundImage: "url('/images/hero-banner.webp')", // Ensure the correct image path
      }}
    >
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">Blast Off into the Ultimate Adventure!</h1>
      <p className="text-xl mb-6 max-w-2xl mx-auto text-gray-100">
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
