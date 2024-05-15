import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Index from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
