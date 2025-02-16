import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { fetchToken, fetchEventDetails } from "../utils/api";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const token = await fetchToken();
        const eventDetails = await fetchEventDetails(token, id);

        if (!eventDetails) {
          throw new Error("Event details not found.");
        }

        setEvent(eventDetails);
      } catch (err) {
        setError("Failed to load event details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle loading state
  if (loading) {
    return <div className="text-center mt-10">Loading event details...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  // Ensure event object exists
  if (!event) {
    return (
      <div className="text-center mt-10 text-red-600">
        Event details are not available.
      </div>
    );
  }

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleBookNow = () => {
    navigate(`/book-now/${event.id}`, { state: { event } });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4">{event.name || "Event Name"}</h1>
        <p className="text-lg max-w-2xl mx-auto">{event.description || "No description available."}</p>
      </header>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        {event.images && event.images.length > 0 ? (
          <Carousel
            responsive={responsive}
            infinite
            itemClass="p-4"
            containerClass="mx-auto"
          >
            {event.images.map((image, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={image.url || "https://via.placeholder.com/300"}
                  alt={image.altText || `Image ${index + 1}`}
                  className="rounded-lg shadow-lg w-full max-w-md"
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">No images available for this event.</p>
        )}
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Details</h3>
          <p><strong>Type:</strong> {event.type || "N/A"}</p>
          <p><strong>Max Occupancy:</strong> {event.maxOccupancy || "N/A"}</p>
          <p><strong>Average Duration:</strong> {event.averageDuration ? `${event.averageDuration} minutes` : "N/A"}</p>
          <p><strong>Contact:</strong> {event.thirdPartyEmail || "N/A"}</p>
          <p><strong>Location:</strong> {event.location || "N/A"}</p>
          <p><strong>Start Date:</strong> {event.startDate || "N/A"}</p>
          <p><strong>End Date:</strong> {event.endDate || "N/A"}</p>
        </div>

        {/* Rates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Rates</h3>
          {event.rates && event.rates.length > 0 ? (
            <ul>
              {event.rates.map((rate, rateIdx) => (
                <li key={rateIdx} className="mb-4">
                  <p className="font-bold">{rate.name || "Rate"}</p>
                  <ul className="list-disc list-inside">
                    {rate.rateTypes.map((rateType, idx) => (
                      <li key={idx}>
                        {rateType.type || "N/A"}: ${rateType.price ? rateType.price.toFixed(2) : "N/A"}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rate information available.</p>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button
          onClick={handleBookNow}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 mr-4"
        >
          Book Now
        </button>
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700">
          Share Event
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 mt-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Adventure Park Events</h3>
          <p className="text-sm">
            Join us for unforgettable experiences and create memories that last a lifetime.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventDetailsPage;
