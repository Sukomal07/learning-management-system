import { Route, Routes } from 'react-router-dom'

import About from './pages/About'
import HomePage from './pages/HomePage'
import LogIn from './pages/LogIn'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  )
}

export default App