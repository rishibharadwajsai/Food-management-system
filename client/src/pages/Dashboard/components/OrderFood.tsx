import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import BookingComponent from "./BookingComponent";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
}

const OrderFood: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [showBooking, setShowBooking] = useState<boolean>(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const fetchMeals = async () => {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    if (selectedCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else if (selectedArea) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    }

    try {
      const res = await axios.get(url);
      setMeals(res.data.meals || []);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      setCategories(res.data.categories.map((cat: any) => cat.strCategory));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      setAreas(res.data.meals.map((area: any) => area.strArea));
    } catch (err) {
      console.error("Error fetching areas:", err);
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchCategories();
    fetchAreas();
  }, [selectedCategory, selectedArea]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOrder = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowBooking(true);
  };

  const isVegetarian = (meal: Meal) => {
    const nonVegetarianKeywords = ["chicken", "beef", "pork", "lamb", "fish", "bacon"];
    const ingredients = meal.strInstructions.toLowerCase();
    return !nonVegetarianKeywords.some((keyword) => ingredients.includes(keyword));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen relative px-48">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="bg-gradient-to-b from-gray-100 via-orange-100 to-yellow-100 h-full w-full" />
        <div className="absolute top-10 left-10 bg-orange-300 rounded-full h-24 w-24"></div>
        <div className="absolute bottom-20 right-20 bg-purple-200 rounded-full h-32 w-32"></div>
        <div className="absolute top-80 right-10 bg-orange-300 rounded-full h-24 w-24"></div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 mb-8 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for meals..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchMeals}
          className="ml-4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>

      {/* Filter Options */}
      <div className="relative z-10 mb-6 flex space-x-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Area Filter */}
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Meals Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            >
              <img
                src={`${meal.strMealThumb}/preview`}
                alt={meal.strMeal}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{meal.strMeal}</h3>
                  {isVegetarian(meal) ? (
                    <FaLeaf className="text-green-500 text-2xl" title="Vegetarian" />
                  ) : (
                    <FaDrumstickBite className="text-red-500 text-2xl" title="Non-Vegetarian" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  {meal.strCategory} - {meal.strArea}
                </p>
                <button
                  onClick={() => handleOrder(meal)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No meals found.</div>
        )}
      </div>

      {/* Booking Popup Modal */}
      {showBooking && selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowBooking(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Book your Meal</h2>

            {/* Pass the selected meal to BookingComponent */}
            <BookingComponent selectedMeal={selectedMeal.strMeal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFood;
