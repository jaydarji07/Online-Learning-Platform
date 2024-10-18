
// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';

// const predefinedCourses = [
//   { id: 1, title: 'React Basics', instructor: 'John Doe' },
//   { id: 2, title: 'JavaScript Advanced', instructor: 'Jane Smith' },
//   { id: 3, title: 'CSS Mastery', instructor: 'Chris Johnson' },
//   { id: 4, title: 'UI/UX Design Fundamentals', instructor: 'Josef Lion' },
//   { id: 5, title: 'Data Science with Python', instructor: 'Mark Deo' },
// ];

// const colors = [
//   'bg-blue-100',
//   'bg-green-100',
//   'bg-red-100',
//   'bg-yellow-100',
//   'bg-purple-100',
// ];

// const UserDashboard = () => {
//   const { courseId } = useParams();
//   const [backgroundColor, setBackgroundColor] = useState('');

//   // Find the enrolled course
//   const enrolledCourse = predefinedCourses.find(course => course.id === parseInt(courseId));

//   useEffect(() => {
//     // Set dynamic background color based on course ID
//     if (enrolledCourse) {
//       setBackgroundColor(colors[enrolledCourse.id % colors.length]);
//     }
//   }, [enrolledCourse]);

//   return (
//     <div className={`container mx-auto px-6 md:px-24 py-12 ${backgroundColor} rounded-lg shadow-md transition duration-300`}>
//       <h2 className="text-3xl font-bold mb-4 mt-6 text-center">User Dashboard</h2>
//       {
//         enrolledCourse ? (
//           <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
//             <h3 className="text-xl font-semibold mb-2">Enrolled Course:</h3>
//             <p className="font-semibold">{enrolledCourse.title}</p>
//             <p>Instructor: {enrolledCourse.instructor}</p>
//             <Link to={`/lesson/${enrolledCourse.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-5">Lesson</Link>
//           </div>
//         ) : (
//           <p className="text-center">No courses enrolled.</p>
//         )
//       }
//     </div>
//   );
// }

// export default UserDashboard;

/////

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const predefinedCourses = [
  { id: 1, title: 'React Basics', instructor: 'John Doe', description: 'Learn the fundamentals of React and build dynamic web applications.' },
  { id: 2, title: 'JavaScript Advanced', instructor: 'Jane Smith', description: 'Deep dive into advanced JavaScript concepts and techniques.' },
  { id: 3, title: 'CSS Mastery', instructor: 'Chris Johnson', description: 'Master modern CSS for creating responsive and beautiful designs.' },
  { id: 4, title: 'UI/UX Design Fundamentals', instructor: 'Josef Lion', description: 'Understand the principles of UI/UX design and create user-friendly interfaces.' },
  { id: 5, title: 'Data Science with Python', instructor: 'Mark Deo', description: 'Explore data analysis, visualization, and machine learning using Python.' },
];

const colors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-red-100',
  'bg-yellow-100',
  'bg-purple-100',
];

const UserDashboard = () => {
  const { courseId } = useParams();
  const [backgroundColor, setBackgroundColor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Find the enrolled course
    const enrolledCourse = predefinedCourses.find(course => course.id === parseInt(courseId));
    setSelectedCourse(enrolledCourse);

    // Set dynamic background color based on course ID
    if (enrolledCourse) {
      setBackgroundColor(colors[enrolledCourse.id % colors.length]);
    }
  }, [courseId]);

  const filteredCourses = predefinedCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mx-auto px-6 md:px-24 py-12 ${backgroundColor} rounded-lg shadow-md transition duration-300`}>
      <h2 className="text-3xl font-bold mb-4 mt-6 text-center">User Dashboard</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      {selectedCourse ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">{selectedCourse.title}</h3>
          <p className="font-semibold">Instructor: {selectedCourse.instructor}</p>
          <p>{selectedCourse.description}</p>
          <Link to={`/lesson/${selectedCourse.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-5">Go to Lesson</Link>
        </div>
      ) : (
        <p className="text-center">No course selected. Please select a course.</p>
      )}

      {/* Course List */}
      <h3 className="text-2xl font-bold mb-4">Available Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <div key={course.id} className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer`} onClick={() => setSelectedCourse(course)}>
            <h4 className="text-lg font-semibold">{course.title}</h4>
            <p className="text-gray-500">Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
