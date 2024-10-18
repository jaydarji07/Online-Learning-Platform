
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const coursesPerPage = 6;

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      const fetchedCourses = [
        { id: 1, title: 'React Basics', description: 'Learn the basics of React.', category: 'Programming', difficulty: 'Beginner', rating: 4.5, enrollments: 1200 },
        { id: 2, title: 'JavaScript Advanced', description: 'Master advanced JavaScript concepts.', category: 'Programming', difficulty: 'Advanced', rating: 4.8, enrollments: 950 },
        { id: 3, title: 'CSS Mastery', description: 'Deep dive into modern CSS techniques.', category: 'Design', difficulty: 'Intermediate', rating: 4.2, enrollments: 700 },
        { id: 4, title: 'UI/UX Design Fundamentals', description: 'Learn the principles of UI/UX design.', category: 'Design', difficulty: 'Beginner', rating: 4.7, enrollments: 600 },
        { id: 5, title: 'Data Science with Python', description: 'Introduction to data science using Python.', category: 'Data Science', difficulty: 'Intermediate', rating: 4.6, enrollments: 800 },
        { id: 6, title: 'Node.js Essentials', description: 'Learn backend development with Node.js.', category: 'Programming', difficulty: 'Intermediate', rating: 4.4, enrollments: 500 },
        { id: 7, title: 'Machine Learning Basics', description: 'An introduction to Machine Learning concepts.', category: 'Data Science', difficulty: 'Beginner', rating: 4.9, enrollments: 1500 },
      ];
      setCourses(fetchedCourses);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filtering Logic
  useEffect(() => {
    let filtered = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? course.category === selectedCategory : true) &&
        (selectedDifficulty ? course.difficulty === selectedDifficulty : true)
      );
    });

    // Sorting Logic
    if (sortOption === 'title') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, sortOption, courses]);

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-6">Course Catalog</h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="border border-gray-300 rounded-md p-2 mb-4 md:mb-0 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-md p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
          </select>

          <select
            className="border border-gray-300 rounded-md p-2"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All Difficulty Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            className="border border-gray-300 rounded-md p-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </select>

          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedDifficulty('');
              setSortOption('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <>
          {/* Course List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:bg-blue-50 transition duration-300 ease-in-out"
                key={course.id}
              >
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <p className="font-semibold">Category: {course.category}</p>
                <p className="font-semibold">Difficulty: {course.difficulty}</p>
                <p className="font-semibold">Rating: {course.rating} ⭐</p>
                <p className="font-semibold">Enrollments: {course.enrollments}</p>
                <Link
                  to={`/detail/${course.id}`}
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="mx-1 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                First
              </button>
            )}
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="mx-1 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Previous
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`mx-1 px-4 py-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="mx-1 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Next
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="mx-1 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Last
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseCatalog;
