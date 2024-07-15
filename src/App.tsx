import '@/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
// import SignIn from '@/pages/signin'
import TaskDetailsByIdentifierPage from './pages/tasks/details'
import { useContext } from 'react'
import Login from './pages/signin_new'
import Callback from './pages/callback'
import { AuthContext, AuthContextType } from './context/auth'

function App() {
  const { token } = useContext(AuthContext) as AuthContextType
  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/signin" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
          </>
        ) : (
          <Route path="*" Component={Layout} />
        )}
        <Route
          path="/tasks/details/:identifier"
          Component={TaskDetailsByIdentifierPage}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
