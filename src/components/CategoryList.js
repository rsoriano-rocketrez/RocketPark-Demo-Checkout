const CategoryList = ({ categories, onSelectCategory }) => {
    return (
      <div className="flex justify-center gap-4 my-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="text-lg px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md"
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default CategoryList;
  