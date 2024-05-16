import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Index from '@/pages'
import SignIn from '@/pages/signin.tsx'
import SignUp from '@/pages/signup.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
