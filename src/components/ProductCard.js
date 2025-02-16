const ProductCard = ({ name, image, description, onBuy }) => {
    return (
      <div className="bg-white border rounded-lg shadow-md p-4 text-center w-72 hover:shadow-lg transition-shadow duration-300">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button
          onClick={onBuy}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Buy Now
        </button>
      </div>
    );
  };
  
  export default ProductCard;
  