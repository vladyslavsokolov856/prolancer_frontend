import Index from '@/pages/index'
import Settings from '@/pages/settings'
import Cusomters from '@/pages/customers'
import New from '@/pages/customers/new'
import UserIndexPage from '@/pages/users'

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
    path: '/admin/users',
    element: <UserIndexPage />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <h1>Page not found.</h1>,
  },
]

export default routesConfig;
