import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    onToggle(isOpen);
  }, [isOpen, onToggle]);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center z-50 justify-between p-4 bg-gray-900">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Your Logo"
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover"
        />
      </div>
      <div className="hidden md:flex text-sm sm:text-lg lg:text-xl items-center space-x-2 sm:space-x-4">
        <a href="#experience" className="text-white hover:text-gray-500">Experience</a>
        <a href="#education" className="text-white hover:text-gray-500">Education</a>
        <a href="#skills" className="text-white hover:text-gray-500">Skills</a>
        <a href="#projects" className="text-white hover:text-gray-500">Projects</a>
        <a href="#certifications" className="text-white hover:text-gray-500">Certifications</a>
      </div>
      <div className="md:hidden z-60 relative">
        <button onClick={toggleMenu} className="text-white focus:outline-none relative z-70">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div className={`absolute top-16 left-0 w-full bg-gray-800 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-start space-y-4 py-4">
          <a href="#experience" className="text-white text-lg" onClick={toggleMenu}>Experience</a>
          <a href="#education" className="text-white text-lg" onClick={toggleMenu}>Education</a>
          <a href="#skills" className="text-white text-lg" onClick={toggleMenu}>Skills</a>
          <a href="#projects" className="text-white text-lg" onClick={toggleMenu}>Projects</a>
          <a href="#certifications" className="text-white text-lg" onClick={toggleMenu}>Certifications</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
