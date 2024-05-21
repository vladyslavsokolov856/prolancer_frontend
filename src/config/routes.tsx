import Index from '@/pages/index'
import Cusomters from '@/pages/customers'
import SignIn from '@/pages/signin.tsx'
import SignUp from '@/pages/signup.tsx'
import New from '@/pages/customers/new'

export interface RouteConfig {
  path: string
  element: JSX.Element
  auth?: boolean
  label?: string
}

const customerRoutes: RouteConfig[] = [
  {
    path: '/customers/new',
    element: <New />,
    label: 'New Customer',
  },
]

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Index />,
  },
  ...customerRoutes,
  {
    path: '/customers',
    element: <Cusomters />,
  },
  {
    path: '*',
    element: <h1>Page not found.</h1>,
  },
]

export default routesConfig
