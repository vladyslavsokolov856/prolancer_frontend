import Index from '@/pages/index'
import Settings from '@/pages/settings'

import Cusomters from '@/pages/customers'
import New from '@/pages/customers/new'
import TimeRegistration from '@/pages/time'
import UserIndexPage from '@/pages/users'

import TaskIndexPage from '@/pages/tasks'
import NewTaskPage from '@/pages/tasks/new'
import EditTaskPage from '@/pages/tasks/edit'

import NewInvoicePage from '@/pages/invoices/new'

export interface RouteConfig {
  path: string
  element: JSX.Element
  auth?: boolean
  label?: string
}

const customerRoutes: RouteConfig[] = [
  {
    path: '/customers',
    element: <Cusomters />,
  },
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

const taskRoutes: RouteConfig[] = [
  { path: '/tasks', element: <TaskIndexPage /> },
  {
    path: '/tasks/:taskId/edit',
    element: <EditTaskPage />,
    label: 'Edit Task',
  },
  {
    path: '/tasks/new',
    element: <NewTaskPage />,
    label: 'New Task',
  },
]

const invoiceRoutes: RouteConfig[] = [
  {
    path: '/invoices/new',
    element: <NewInvoicePage />,
    label: 'New Invoice',
  },
]

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Index />,
  },
  ...customerRoutes,
  ...timeRoutes,
  ...taskRoutes,
  ...invoiceRoutes,
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

export default routesConfig
