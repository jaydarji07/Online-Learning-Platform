
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from an external API (simulated here)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.example.com/courses'); // Replace with your actual API
        const data = await response.json();
        
        // Randomly select featured courses from the list (simulating here)
        const randomFeaturedCourses = data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setFeaturedCourses(randomFeaturedCourses);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <div className="container mx-auto px-6 md:px-24 py-12">
        <h2 className='text-4xl font-bold text-center mb-10'>Featured Courses</h2>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className='relative bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out group'
              >
                <h3 className='text-xl font-semibold mb-2'>{course.title}</h3>
                <p className='text-gray-600 mb-4'>{course.description}</p>
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                  {course.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
                  {course.difficulty}
                </div>
                <div className='mt-6'>
                  <Link to={`/detail/${course.id}`} className='inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='text-center mt-12'>
          <Link to="/catalog" className='inline-block bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition'>
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
  