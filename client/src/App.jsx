import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import About from './pages/About'
import LogIn from './pages/auth/LogIn'
import RequiredAuth from './pages/auth/RequiredAuth'
import SignUp from './pages/auth/SignUp'
import Contact from './pages/Contact'
import CourseDescription from './pages/course/CourseDescription'
import CourseList from './pages/course/CourseList'
import CreateCourse from './pages/course/CreateCourse'
import EditCourse from './pages/course/EditCourse'
import AddCourseLecture from './pages/dashboard/AddCourseLecture'
import CourseLectures from './pages/dashboard/CourseLectures'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ChangePassword from './pages/password/ChangePassword'
import ResetPassword from './pages/password/ResetPassword'
import Checkout from './pages/payments/Checkout'
import CheckoutFail from './pages/payments/CheckoutFail'
import CheckoutSuccess from './pages/payments/CheckoutSuccess'
import Profile from './pages/user/Profile'
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/')
    }
  }, [isLoggedIn, location.pathname, navigate])
  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />

        <Route path='/' element={<HomePage />} />

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />

        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/courses' element={<CourseList />} />
        <Route path='/course/description' element={<CourseDescription />} />
        <Route element={<RequiredAuth allowedRole={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />} />
          <Route path='/course/:name/:id/editCourse' element={<EditCourse />} />
          <Route path='/course/:name/:id/lectures/addlecture' element={<AddCourseLecture />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={["ADMIN", "USER"]} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/changePassword' element={<ChangePassword />} />
          <Route path='/course/:name/checkout' element={<Checkout />} />
          <Route path='/course/:name/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/course/:name/checkout/fail' element={<CheckoutFail />} />
          <Route path='/course/:name/:id/lectures' element={<CourseLectures />} />
        </Route>
      </Routes>
    </>
  )
}

export default App