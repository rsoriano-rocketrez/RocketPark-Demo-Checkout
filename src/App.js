import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import Homepage from "./pages/HomePage";
import GiftShopPage from "./pages/GiftShopPage";
import EventsPage from "./pages/EventsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage"; // Import the ProductDetailsPage
import EventDetailsPage from "./pages/EventDetailsPage"; // Import the EventDetailsPage
//import BookNowPage from "./pages/BookNowPage"; // Import the BookNowPage
import CartPage from "./pages/CartPage.js"; // Import the CartPage
import { useCart } from "./context/CartContext"; // Import Cart Context for cart count

const App = () => {
  const { cart } = useCart(); // Access cart context to display cart item count

  return (
    <Router>
      <div>
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <nav className="max-w-6xl mx-auto flex justify-between items-center px-6">
            {/* Branding */}
            <div className="text-2xl font-bold">
              <Link to="/" className="hover:underline">
                Rocket Park
              </Link>
            </div>
            {/* Navigation Links */}
            <ul className="flex space-x-6 text-lg items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/giftshop"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
                    }`
                  }
                >
                  Gift Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
                    }`
                  }
                >
                  Events
                </NavLink>
              </li>
              {/* Cart Icon */}
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-blue-700 font-bold" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/giftshop" element={<GiftShopPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} /> {/* Product Details Route */}
            <Route path="/events/:id" element={<EventDetailsPage />} /> {/* Event Details Route */}
            <Route path="/cart" element={<CartPage />} /> {/* Cart Page Route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
