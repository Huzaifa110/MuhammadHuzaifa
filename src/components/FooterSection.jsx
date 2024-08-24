import React from 'react';

const FooterSection = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 text-center text-sm sm:text-base z-10">
      <p>Copyright &copy; {new Date().getFullYear()}, Muhammad Huzaifa</p>
    </footer>
  );
};

export default FooterSection;
