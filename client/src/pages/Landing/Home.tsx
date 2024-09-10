import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen md:h-auto overflow-y-auto flex flex-col md:flex-row">
      {/* Left side - Professional muted color */}
      <div className="flex-1 bg-gray-900 text-white flex items-center justify-center px-8 py-20 relative">
        {/* Left-side Content */}
        <div className="space-y-10 max-w-md">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-[#FFD700]">Elevate</span> <br /> Your Meal Experience
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-gray-300 font-light">
            Experience seamless meal planning and food orders. Let us handle the details while you focus on enjoying your day.
          </p>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold border-b-2 border-[#FFD700] inline-block pb-1">
              Why MealEase?
            </h2>
            <ul className="list-disc list-inside text-lg space-y-4 text-gray-400">
              <li>Personalized meals tailored to your taste.</li>
              <li>Track your orders and meal plans with ease.</li>
              <li>User-friendly navigation for a smooth experience.</li>
            </ul>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700] rounded-full opacity-30 filter blur-lg"></div>
        <div className="absolute bottom-10 left-0 w-24 h-24 bg-[#FF6347] rounded-full opacity-20 filter blur-lg"></div>
      </div>

      {/* Right side - Image with subtle overlay */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-8 py-20 relative">
        {/* Right-side Content */}
        <div className="relative w-full h-full">
          <div
            className="relative bg-cover bg-center rounded-lg shadow-xl w-full h-full transition-transform transform hover:scale-105"
            style={{
              backgroundImage: "url('https://source.unsplash.com/featured/?dining-experience')",
            }}
          ></div>
          {/* Image text overlay */}
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex flex-col justify-center items-center text-white transition-opacity hover:opacity-80">
            <h3 className="text-4xl font-bold drop-shadow-lg uppercase tracking-wider">
              Delicious Meals <br /> <span className="text-[#FFD700]">Tailored for You</span>
            </h3>
            <p className="text-xl italic mt-4 font-light">Curated with care, delivered with ease.</p>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-0 right-10 w-24 h-24 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-lg opacity-50"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6347] rounded-full mix-blend-multiply filter blur-lg opacity-30"></div>
    </div>
  );
};

export default Home;
