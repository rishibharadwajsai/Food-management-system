// Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); 

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsOpen((prev) => !prev); 
  };

  // Close the navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); 
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-white text-2xl font-bold">MyWebsite</div>
          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              ref={buttonRef}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

         
          <div className="hidden md:flex md:items-center md:w-auto">
            <ul className="md:flex md:space-x-4 md:mt-0 mt-4 text-white">
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Contact
                </a>
              </li>
            
              <li>
                <a href="/signup" className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={navRef}
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-gray-800 w-full`}
      >
        <ul className="space-y-4 p-4 text-white">
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Contact
            </a>
          </li>
          {/* Signup Button for Mobile */}
          <li>
            <a href="/signup" className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Signup
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
