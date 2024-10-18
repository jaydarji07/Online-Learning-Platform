
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const predefinedCourses = [
  { id: 1, title: 'React Basics', description: 'Learn the basics of React.', category: 'Programming', difficulty: 'Beginner', instructor: 'John Doe' },
  { id: 2, title: 'JavaScript Advanced', description: 'Master advanced JavaScript concepts.', category: 'Programming', difficulty: 'Advanced', instructor: 'Jane Smith' },
  { id: 3, title: 'CSS Mastery', description: 'Deep dive into modern CSS techniques.', category: 'Design', difficulty: 'Intermediate', instructor: 'Chris Johnson' },
  { id: 4, title: 'UI/UX Design Fundamentals', description: 'Learn the principles of UI/UX design.', category: 'Design', difficulty: 'Beginner', instructor: 'Josef Lion' },
  { id: 5, title: 'Data Science with Python', description: 'Introduction to data science using Python.', category: 'Data Science', difficulty: 'Intermediate', instructor: 'Mark Deo' }
];

const colors = {
  Beginner: 'bg-green-100',
  Intermediate: 'bg-yellow-100',
  Advanced: 'bg-red-100'
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);

  useEffect(() => {
    // Find the course by courseId
    const currentCourse = predefinedCourses.find(course => course.id === parseInt(courseId));
    setCourse(currentCourse);

    // Find similar courses (same category, exclude the current course)
    if (currentCourse) {
      const relatedCourses = predefinedCourses.filter(
        c => c.category === currentCourse.category && c.id !== currentCourse.id
      );
      setSimilarCourses(relatedCourses);
    }
  }, [courseId]);

  if (!course) {
    return <p>Course not found...</p>;
  }

  return (
    <div className="container mx-auto px-6 md:px-24 py-12">
      <h2 className="text-3xl font-bold mb-4 mt-6 text-center">Course Detail</h2>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-2">
        <h3 className="text-3xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-700 mb-4">{course.description}</p>

        {/* Dynamic Badges for Category and Difficulty */}
        <div className="flex items-center space-x-4 mb-4">
          <span className="inline-block bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded">
            {course.category}
          </span>
          <span className={`inline-block ${colors[course.difficulty]} text-gray-800 text-xs font-bold px-2 py-1 rounded`}>
            {course.difficulty}
          </span>
        </div>

        <p className="font-semibold mb-4">Instructor: {course.instructor}</p>

        <Link to={`/dashboard/${course.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          {course.isEnrolled ? 'Go to Dashboard' : 'Enroll Now'}
        </Link>
      </div>

      {/* Similar Courses Section */}
      {similarCourses.length > 0 && (
        <div className="mt-12">
          <h4 className="text-2xl font-bold mb-4">Similar Courses</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCourses.map(similarCourse => (
              <div
                key={similarCourse.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl transform hover:translate-y-2"
              >
                <h5 className="text-lg font-semibold mb-2">{similarCourse.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{similarCourse.description}</p>
                <Link to={`/course/${similarCourse.id}`} className="text-blue-500 hover:underline">
                  View Course
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
