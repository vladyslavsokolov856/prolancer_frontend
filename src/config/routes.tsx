import Index from '@/pages/index'
import Cusomters from '@/pages/customers'
import New from '@/pages/customers/new'
import TimeRegistration from '@/pages/time'

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
  {
    path: '/customers',
    element: <Cusomters />,
  },
]

const timeRoutes: RouteConfig[] = [
  {
    path: '/time-registration',
    element: <TimeRegistration />,
  },
]

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Index />,
  },
  ...customerRoutes,
  ...timeRoutes,
  {
    path: '*',
    element: <h1>Page not found.</h1>,
  },
]

export default routesConfig
