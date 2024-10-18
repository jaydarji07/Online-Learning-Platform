// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-24">
        <Link to="/" className="text-xl font-bold">CourseHub</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/catalog" className="hover:text-gray-300 transition">Course Catalog</Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
