import React from "react";
import { useCart } from "../context/CartContext"; // Import CartContext

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Access cart and removeFromCart function

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add some tickets!</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Total:</strong> ${item.total.toFixed(2)}
                </p>
              </div>
              <button
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
