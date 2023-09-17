import { Route, Routes } from 'react-router-dom'

import About from './pages/About'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import Contact from './pages/Contact'
import CourseDescription from './pages/course/CourseDescription'
import CourseList from './pages/course/CourseList'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/password/ResetPassword'
function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/course/description' element={<CourseDescription />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App