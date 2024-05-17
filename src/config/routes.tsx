import Index from '@/pages/index'

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
    path: '*',
    element: <h1>Page not found.</h1>,
  },
]

export default routesConfig
