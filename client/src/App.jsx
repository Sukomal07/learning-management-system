import { Route, Routes } from 'react-router-dom'

import About from './pages/About'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  )
}

export default App