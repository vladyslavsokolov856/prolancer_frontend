import Index from '@/pages/index'
import SignIn from '@/pages/signin.tsx'
import SignUp from '@/pages/signup.tsx'

export interface RouteConfig {
  path: string
  element: JSX.Element
  auth?: boolean
  label?: string
}

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <h1>Page not found.</h1>,
  },
]

export default routesConfig
