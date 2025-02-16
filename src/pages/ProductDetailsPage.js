import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchToken, fetchProductDetails, fetchProductsByType } from "../utils/api";

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get product ID from route
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [reviews, setReviews] = useState([]); // User reviews

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = await fetchToken();
        const productDetails = await fetchProductDetails(token, id);
        setProduct(productDetails);

        // Fetch related products based on category
        if (productDetails.category) {
          const related = await fetchProductsByType(token, "retail");
          const filtered = related.filter(
            (relatedProduct) =>
              relatedProduct.category === productDetails.category &&
              relatedProduct.id !== parseInt(id) // Exclude the current product
          );
          setRelatedProducts(filtered);
        }

        // Fetch placeholder user reviews
        const placeholderReviews = [
          { id: 1, user: "Alice", rating: 5, comment: "Amazing product!" },
          { id: 2, user: "Bob", rating: 4, comment: "Very good, but could be cheaper." },
          { id: 3, user: "Charlie", rating: 3, comment: "Average experience." },
        ];
        setReviews(placeholderReviews);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Placeholder functionality for adding to cart
    console.log(`Added ${quantity} of ${product.name} to the cart.`);
    alert(`Added ${quantity} of "${product.name}" to the cart.`);
  };

  if (loading) return <div className="text-center mt-10">Loading product details...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center mt-10">No product details found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white py-4 shadow-md text-center">
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </header>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || "Product Image"}
                className="rounded-lg shadow-md w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ""; // Fallback if image fails
                }}
              />
            ) : (
              <div className="bg-gray-300 rounded-lg shadow-md w-full h-64 flex items-center justify-center">
                <p className="text-gray-700">Image Not Available</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <p className="mb-4">{product.description}</p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Color:</strong> {product.color || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Size:</strong> {product.size || "N/A"}
            </p>
            <p className="mb-4">
              <strong>Price:</strong>{" "}
              {product.hasPriceOverride ? (
                <span>
                  <span className="line-through text-red-600 mr-2">${product.price}</span>
                  <span className="text-green-600 font-bold">${product.displayPrice}</span>
                </span>
              ) : (
                <span className="text-green-600 font-bold">${product.price || "N/A"}</span>
              )}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block mb-2 font-bold">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 border rounded text-center"
                min="1"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* User Reviews */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">User Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                  <p>
                    <strong>{review.user}</strong> rated this product{" "}
                    <span className="text-yellow-500">{review.rating} / 5</span>
                  </p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  className="bg-white border rounded-lg shadow-md p-4 text-center"
                  onClick={() => navigate(`/product/${related.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{related.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{related.category}</p>
                  <p className="text-green-600 font-bold">
                    ${related.displayPrice || related.price || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
