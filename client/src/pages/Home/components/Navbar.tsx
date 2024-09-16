// import React, { useState, useRef } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import Login from './Login';
// import SignUp from './Signup';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
//   const formRef = useRef<HTMLDivElement>(null); // Reference for the form

//   // Toggle function for opening and closing the mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // Open the signup/login popup
//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   // Handle tab switching
//   const handleTabSwitch = (tab: 'login' | 'signup') => {
//     setActiveTab(tab);
//   };

//   // Close popup if clicking outside the form
//   const handleClickOutside = (event: React.MouseEvent) => {
//     if (formRef.current && !formRef.current.contains(event.target as Node)) {
//       setShowPopup(false);
//     }
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed w-full z-20 top-0">
//         <div className="flex justify-between items-center">
//           {/* Left Side: Brand Name with bg-gray-900 */}
//           <div className="bg-gray-900 text-white p-4 flex-shrink-0 w-1/2">
//             <div className="text-2xl font-bold">MealEase</div>
//           </div>

//           {/* Right Side: Menu with bg-white */}
//           <div className="flex-grow bg-gray-900 md:bg-white flex justify-end items-center p-3">
//             {/* Hamburger Icon (visible only on mobile) */}
//             <div className="md:hidden">
//               <button onClick={toggleMenu} className="text-gray-400 focus:outline-none">
//                 {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
//               </button>
//             </div>

//             {/* Desktop Menu Items */}
//             <div className="hidden w-1/2 md:flex md:items-center space-x-6 text-gray-400 p-2 mx-auto">
//               <a href="#home" className="hover:text-gray-600">Home</a>
//               <a href="#about" className="hover:text-gray-600">About</a>
//               <a href="#services" className="hover:text-gray-600">Services</a>
//               <a href="#contact" className="hover:text-gray-600">Contact</a>
//             </div>

//             {/* Sign Up Button */}
//             <button className="hidden md:flex bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" onClick={togglePopup}>
//               Sign Up
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu - Appears below the navbar */}
//         {isOpen && (
//           <div className="md:hidden">
//             <ul className="flex flex-col bg-gray-900 text-white w-full text-center space-y-4 p-3">
//               <li>
//                 <a href="#home" className="hover:text-gray-300">Home</a>
//               </li>
//               <li>
//                 <a href="#about" className="hover:text-gray-300">About</a>
//               </li>
//               <li>
//                 <a href="#services" className="hover:text-gray-300">Services</a>
//               </li>
//               <li>
//                 <a href="#contact" className="hover:text-gray-300">Contact</a>
//               </li>
//               <li>
//                 <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" onClick={togglePopup}>
//                   Sign Up
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Overlay (to close menu when clicked outside) */}
//         {isOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
//             onClick={toggleMenu}
//           ></div>
//         )}
//       </nav>

//       {/* Signup/Login Popup */}
//       {showPopup && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
//           onClick={handleClickOutside}
//         >
//           <div ref={formRef} className="bg-white rounded-lg p-6 w-full max-w-md">
//             {/* Tabs: Login | Signup */}
//             <div className="flex justify-between border-b mb-6">
//               <button
//                 className={`pb-2 px-4 font-bold ${activeTab === 'login' ? 'border-b-2 border-green-600 text-green-600' : ''}`}
//                 onClick={() => handleTabSwitch('login')}
//               >
//                 Login
//               </button>
//               <button
//                 className={`pb-2 px-4 font-bold ${activeTab === 'signup' ? 'border-b-2 border-green-600 text-green-600' : ''}`}
//                 onClick={() => handleTabSwitch('signup')}
//               >
//                 Sign Up
//               </button>
//             </div>

//             {/* Form Content */}
//             {activeTab === 'login' ? <Login /> : <SignUp />}

//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//               onClick={togglePopup}
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Login from "./Login";
import SignUp from "./Signup";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup");
  const popupRef = useRef<HTMLDivElement>(null);

  // Toggle mobile menu
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  // Toggle signup/login popup
  const handlePopupToggle = () => setIsPopupOpen(!isPopupOpen);

  // Switch tabs in popup
  const handleTabSwitch = (tab: "login" | "signup") => setActiveTab(tab);

  // Close popup if clicked outside
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-20 bg-gray-900">
        <div className="flex justify-between items-center p-4">
          {/* Brand */}
          <div className="text-white text-2xl font-bold">MealEase</div>

          {/* Menu */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Mobile Menu Button */}
            <button
              className="text-gray-400 md:hidden"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex space-x-6 text-gray-400 items-center">
              <a href="#home" className="hover:text-gray-600">
                Home
              </a>
              <a href="#about" className="hover:text-gray-600">
                About
              </a>
              <a href="#services" className="hover:text-gray-600">
                Services
              </a>
              <a href="#contact" className="hover:text-gray-600">
                Contact
              </a>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={handlePopupToggle}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={handleMenuToggle}
            ></div>
            <div className="fixed inset-0 flex flex-col bg-gray-900 text-white p-6 space-y-4 z-20 items-center">
              <button
                className="text-white self-end"
                onClick={handleMenuToggle}
              >
                <FaTimes size={28} />
              </button>
              <a
                href="#home"
                className="hover:text-gray-300"
                onClick={handleMenuToggle}
              >
                Home
              </a>
              <a
                href="#about"
                className="hover:text-gray-300"
                onClick={handleMenuToggle}
              >
                About
              </a>
              <a
                href="#services"
                className="hover:text-gray-300"
                onClick={handleMenuToggle}
              >
                Services
              </a>
              <a
                href="#contact"
                className="hover:text-gray-300"
                onClick={handleMenuToggle}
              >
                Contact
              </a>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => {
                  handlePopupToggle();
                  handleMenuToggle();
                }}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </nav>

      {/* Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
          onClick={handleOutsideClick}
        >
          <div
            ref={popupRef}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            {/* Tabs: Login | Signup */}
            <div className="flex justify-between border-b mb-6">
              <button
                className={`pb-2 px-4 font-bold ${
                  activeTab === "login"
                    ? "border-b-2 border-green-600 text-green-600"
                    : ""
                }`}
                onClick={() => handleTabSwitch("login")}
              >
                Login
              </button>
              <button
                className={`pb-2 px-4 font-bold ${
                  activeTab === "signup"
                    ? "border-b-2 border-green-600 text-green-600"
                    : ""
                }`}
                onClick={() => handleTabSwitch("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Form Content */}
            {activeTab === "login" ? <Login /> : <SignUp />}

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handlePopupToggle}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
