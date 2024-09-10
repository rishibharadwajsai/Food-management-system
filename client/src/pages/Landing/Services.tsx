import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="relative bg-gray-50 py-16 px-8 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Our <span className="text-[#FFD700]">Services</span>
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Item 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div
              className="bg-cover bg-center h-40 w-full"
              style={{ backgroundImage: "url('https://source.unsplash.com/featured/?meal-prep')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Custom Meal Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized meal plans designed to fit your nutritional needs and preferences. Enjoy healthy, delicious meals tailored just for you.
              </p>
            </div>
          </div>

          {/* Service Item 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div
              className="bg-cover bg-center h-40 w-full"
              style={{ backgroundImage: "url('https://source.unsplash.com/featured/?food-delivery')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience quick and reliable delivery service, ensuring that your meals arrive fresh and on time, every time.
              </p>
            </div>
          </div>

          {/* Service Item 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div
              className="bg-cover bg-center h-40 w-full"
              style={{ backgroundImage: "url('https://source.unsplash.com/featured/?nutrition')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nutritional Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Benefit from expert nutritional advice and support to help you make informed choices and maintain a balanced diet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-0 w-40 h-40 bg-[#FFD700] rounded-full opacity-20 filter blur-xl"></div>
      <div className="absolute bottom-10 right-0 w-32 h-32 bg-[#FF6347] rounded-full opacity-20 filter blur-xl"></div>
    </div>
  );
};

export default Services;
