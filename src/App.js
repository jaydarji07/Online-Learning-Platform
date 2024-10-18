import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import CourseDetail from './Components/CourseDetail';
import Coursecatelog from './Components/Coursecatelog';
import Userdashboard from './Components/Userdashboard';
import Lessonplayer from './Components/Lessonplayer';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route element={<Home/>} path="/" />
          <Route element={<Coursecatelog/>} path="/catalog" />
          <Route element={<CourseDetail/>} path="/detail/:courseId" />
          <Route element={<Userdashboard />} path="/dashboard/:courseId" />
          <Route element={<Lessonplayer/>} path="/lesson/:lessonId" />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
