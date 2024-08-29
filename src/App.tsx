import '@/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import TaskDetailsByIdentifierPage from './pages/tasks/details'
import { HelmetProvider } from 'react-helmet-async'
import Signin from './pages/signin'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" Component={Layout} />
          <Route path="/signin" Component={Signin} />
          <Route
            path="/tasks/details/:identifier"
            Component={TaskDetailsByIdentifierPage}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
