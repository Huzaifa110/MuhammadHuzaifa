import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-[9999]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 focus:outline-none"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
