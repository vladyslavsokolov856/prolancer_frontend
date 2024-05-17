import '@/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import SignIn from '@/pages/signin'
import SignUp from '@/pages/signup'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" Component={SignIn} />
      <Route path="/signup" Component={SignUp} />
      <Route path="*" Component={Layout} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
