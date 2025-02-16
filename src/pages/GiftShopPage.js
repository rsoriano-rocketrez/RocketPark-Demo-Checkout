import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, fetchProductsByType } from "../utils/api";

const GiftShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("name_asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = await fetchToken();
        // Request only id, name, and category.
        // (Price field is omitted so no extra API call is made.)
        const fetchedProducts = await fetchProductsByType(token, "retail", {
          fields: ["id", "name", "category"],
        });

        // Optionally, if in the future the API returns a price, we can handle it:
        const productsWithPrice = fetchedProducts.map((product) => ({
          ...product,
          // If price is not provided, it will be null
          price: product.price || null,
        }));

        setProducts(productsWithPrice);
        setFilteredProducts(productsWithPrice);
        setCategories([
          ...new Set(productsWithPrice.map((product) => product.category)),
        ]);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    const filtered = category
      ? products.filter((product) => product.category === category)
      : products;
    setFilteredProducts(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (option === "name_asc") return a.name.localeCompare(b.name);
      if (option === "name_desc") return b.name.localeCompare(a.name);
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading)
    return <div className="text-center mt-10">Loading products...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white py-6 shadow-md text-center">
        <h1 className="text-4xl font-extrabold">Welcome to the Gift Shop</h1>
        <p className="text-lg mt-2">
          Browse our collection of exclusive products and find the perfect souvenir
          to remember your visit.
        </p>
      </header>
      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="bg-white p-6 rounded-lg shadow-md border">
            {/* Search */}
            <h2 className="text-xl font-bold mb-4">Search</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full p-2 border rounded mb-6"
            />

            {/* Sort */}
            <h2 className="text-xl font-bold mb-4">Sort by</h2>
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="w-full p-2 border rounded mb-6"
            >
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </select>

            {/* Filter by Category */}
            <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
            <ul className="mb-6">
              <li
                className={`cursor-pointer mb-2 ${
                  !selectedCategory ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => handleCategoryFilter("")}
              >
                All
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer mb-2 ${
                    selectedCategory === category
                      ? "font-bold text-blue-600"
                      : ""
                  }`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-4">
              Showing Products ({filteredProducts.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform"
                >
                  <img
                    src={`/images/test-image.jpg`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.category}
                  </p>
                  <p className="text-green-600 font-bold mb-4">
                    {product.price !== null ? `$${product.price}` : "$123.45"}
                  </p>
                  <button
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GiftShopPage;
