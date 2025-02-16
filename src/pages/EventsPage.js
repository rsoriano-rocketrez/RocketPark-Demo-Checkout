import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const events = [
  {
    id: 1,
    name: "Mission to Mars",
    description: "Join us for an intergalactic tour to the Red Planet and beyond!",
    image: "/images/mars.webp",
    price: "General Admission - $50.00",
    ticketTypes: [
      { id: 1, name: "Standard Pass", price: 50, description: "Basic access for the day." },
      { id: 2, name: "All Day Pass", price: 75, description: "Unlimited access for the entire day." },
      { id: 3, name: "Annual Pass", price: 200, description: "Enjoy access all year round." },
    ],
  },
  {
    id: 11,
    name: "Rocket Launch Experience",
    description: "Experience the thrill of a rocket launch and soar through space!",
    image: "/images/launch.webp",
    price: "Starting at $40.00",
    ticketTypes: [
      { id: 1, name: "Standard Pass", price: 40, description: "Basic access for the day." },
      { id: 2, name: "All Day Pass", price: 70, description: "Unlimited access for the entire day." },
    ],
  },
  {
    id: 13,
    name: "Astronaut Training",
    description: "Train like an astronaut and prepare for your future space missions!",
    image: "/images/training.webp",
    price: "Standard Pass - $60.00",
    ticketTypes: [
      { id: 1, name: "Standard Pass", price: 60, description: "Enjoy full astronaut training for one day." },
      { id: 2, name: "All Day Pass", price: 100, description: "Unlimited astronaut training access for the day." },
      { id: 3, name: "Annual Pass", price: 300, description: "Train like an astronaut all year round." },
    ],
  },
];

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);

  const navigate = useNavigate();

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setBookingStep(1);
  };

  const handleTicketTypeChange = (ticketType) => {
    setSelectedTicketType(ticketType);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleHoursChange = (hours) => {
    setSelectedHours(hours);
  };

  const handleWeekChange = (direction) => {
    setCurrentWeek((prevWeek) => prevWeek + direction);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleQuantityChange = (category, increment) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[category] || 0;
      const newQuantity = Math.max(currentQuantity + increment, 0);
      return {
        ...prevQuantities,
        [category]: newQuantity,
      };
    });
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", { selectedEvent, selectedTicketType, selectedDate, selectedHours, quantities });
    setBookingStep(0);
    setSelectedEvent(null);
    setSelectedTicketType(null);
    setSelectedDate(null);
    setSelectedHours(null);
    setQuantities({});
  };

  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    today.setDate(today.getDate() + currentWeek * 7);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Embark on Your Rocket Adventure!</h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          From thrilling rocket missions to hands-on astronaut training, take off into the cosmos with our exciting events.
        </p>
      </header>

      <div className="max-w-6xl mx-auto py-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <p className="text-lg font-semibold text-green-600 mb-4">{event.price}</p>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    onClick={() => handleViewDetails(event.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
                    onClick={() => handleBookNow(event)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Choose Your Experience</h2>
          <div className="grid grid-cols-1 justify-center gap-6 mb-12">
            {selectedEvent.ticketTypes.map((ticketType) => (
              <div
                key={ticketType.id}
                className={`border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 w-1/2 mx-auto ${
                  selectedTicketType?.id === ticketType.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleTicketTypeChange(ticketType)}
              >
                <h3 className="text-lg font-bold mb-2 text-center">{ticketType.name}</h3>
                <p className="text-gray-600 text-center">{ticketType.description}</p>
                <p className="text-green-600 font-semibold mt-2 text-center">{`$${ticketType.price}`}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-extrabold text-center mb-8">Select a Date</h2>
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-7 gap-3">
              {getWeekDates().map((date, i) => {
                const isPeak = date.getDay() === 0 || date.getDay() === 6;
                return (
                  <button
                    key={i}
                    className={`p-4 text-lg font-bold rounded-lg ${
                      isPeak ? "bg-yellow-200" : "bg-green-200"
                    } ${selectedDate?.getDate() === date.getDate() ? "border-2 border-blue-600" : ""}`}
                    onClick={() => handleDateChange(date)}
                  >
                    <div className="text-center">
                      <p>{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
                      <p>{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center gap-8 mb-12">
            <button
              className="text-blue-600 underline font-semibold"
              onClick={() => handleWeekChange(-1)}
            >
              &lt; Previous Week
            </button>
            <button
              className="text-blue-600 underline font-semibold"
              onClick={toggleCalendar}
            >
              View Full Calendar
            </button>
            <button
              className="text-blue-600 underline font-semibold"
              onClick={() => handleWeekChange(1)}
            >
              Next Week &gt;
            </button>
          </div>

          {showCalendar && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4 text-center">January 2025</h3>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(31)].map((_, i) => {
                    const date = new Date(2025, 0, i + 1);
                    const isAvailable = i % 3 !== 0;
                    return (
                      <button
                        key={i}
                        className={`p-2 text-center rounded-lg ${
                          isAvailable ? "bg-green-200" : "bg-red-200"
                        } ${selectedDate?.getDate() === date.getDate() ? "border-2 border-blue-600" : ""}`}
                        onClick={() => handleDateChange(date)}
                        disabled={!isAvailable}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button className="text-blue-600">&lt; Previous Month</button>
                  <button className="text-red-500 underline" onClick={toggleCalendar}>
                    Close
                  </button>
                  <button className="text-blue-600">Next Month &gt;</button>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-extrabold text-center mb-8">Park Hours</h2>
          <div className="flex justify-center gap-4 mb-12">
            <button
              className={`p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition-all duration-300 ${
                selectedHours === "Morning: 8AM-12PM" ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => handleHoursChange("Morning: 8AM-12PM")}
            >
              Morning: 8AM-12PM
            </button>
            <button
              className={`p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition-all duration-300 ${
                selectedHours === "Evening: 4PM-8PM" ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => handleHoursChange("Evening: 4PM-8PM")}
            >
              Evening: 4PM-8PM
            </button>
          </div>

          <h2 className="text-3xl font-extrabold text-center mb-8">Select Quantity</h2>
          <div className="grid grid-cols-1 gap-6 mb-12">
            {"Adult Child Youth Senior".split(" ").map((category) => (
              <div
                key={category}
                className="border p-4 rounded-lg shadow-md w-1/2 mx-auto"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{category}</h3>
                    <p className="text-sm text-gray-600">
                      {category === "Child" ? "Free with Adult" : `$${category === "Adult" ? 50 : 30}.00`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                      onClick={() => handleQuantityChange(category, -1)}
                    >
                      -
                    </button>
                    <div className="px-4 text-lg font-bold">
                      {quantities[category] || 0}
                    </div>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                      onClick={() => handleQuantityChange(category, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              className="bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
              disabled={!selectedTicketType || !selectedDate || !selectedHours}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <footer className="bg-blue-600 text-white py-8 mt-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Rocket Experience</h3>
          <p className="text-sm">
            Join us for an unforgettable space journey that will take you to new heights!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;
