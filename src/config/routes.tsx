import Dashboard from '@/pages/dashboard'
import Index from '@/pages/index'
import Settings from '@/pages/settings'
import Invoices from '@/pages/invoices'

import CustomersPage from '@/pages/customers'
import CustomerDetailPage from '@/pages/customers/id'
import NewCustomerPage from '@/pages/customers/new'
import EditCustomerPage from '@/pages/customers/edit'

import TimeRegistration from '@/pages/time'

import TaskIndexPage from '@/pages/tasks'
import TaskDetailPage from '@/pages/tasks/id'
import NewTaskPage from '@/pages/tasks/new'
import EditTaskPage from '@/pages/tasks/edit'

import NewInvoicePage from '@/pages/invoices/new'
import ShowInvoice from '@/pages/invoices/show'
import EditInvoice from '@/pages/invoices/edit'

import NewDeductionPage from '@/pages/deductions/new'
import DeductionDetailPage from '@/pages/deductions/id'
import DeductionIndexPage from '@/pages/deductions'
import EditDeductionPage from '@/pages/deductions/edit'

import UserIndexPage from '@/pages/users'
import EditUserPage from '@/pages/users/edit'
import NewUserpage from '@/pages/users/new'

export interface RouteConfig {
  path: string
  element: JSX.Element
  auth?: boolean
  label?: string
}

const customerRoutes: RouteConfig[] = [
  {
    path: '/customers',
    element: <CustomersPage />,
    label: 'Customers',
  },
  {
    path: '/customers/new',
    element: <NewCustomerPage />,
    label: 'New Customer',
  },
  {
    path: '/customers/:customerId',
    element: <CustomerDetailPage />,
    label: 'Edit Customer',
  },
  {
    path: '/customers/:customerId/edit',
    element: <EditCustomerPage />,
    label: 'Edit Customer',
  },
]

const timeRoutes: RouteConfig[] = [
  {
    path: '/time-registration',
    element: <TimeRegistration />,
    label: 'Time Registration',
  },
]

const taskRoutes: RouteConfig[] = [
  { path: '/tasks', element: <TaskIndexPage />, label: 'Tasks' },
  {
    path: '/tasks/:taskId',
    element: <TaskDetailPage />,
    label: 'Task details',
  },
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
    path: '/invoices',
    element: <Invoices />,
    label: 'Invoices',
  },
  {
    path: '/invoices/:invoiceId',
    element: <ShowInvoice />,
    label: 'Show Invoice',
  },
  {
    path: '/invoices/new',
    element: <NewInvoicePage />,
    label: 'New Invoice',
  },
  {
    path: '/invoices/:invoiceId/edit',
    element: <EditInvoice />,
    label: 'Edit Invoice',
  },
]

const deductionRoutes: RouteConfig[] = [
  {
    path: '/deductions/:deductionId',
    element: <DeductionDetailPage />,
    label: 'Deduction details',
  },
  {
    path: '/deductions/new',
    element: <NewDeductionPage />,
    label: 'New Deduction',
  },
  {
    path: '/deductions',
    element: <DeductionIndexPage />,
    label: 'Deductions',
  },
  {
    path: '/deductions/:deductionId/edit',
    element: <EditDeductionPage />,
    label: 'Edit Deduction'
  }
]

const userRoutes: RouteConfig[] = [
  { path: '/admin/users', element: <UserIndexPage />, label: 'Users' },
  {
    path: '/admin/users/:userId/edit',
    element: <EditUserPage />,
    label: 'Edit User',
  },
  {
    path: '/admin/users/new',
    element: <NewUserpage />,
    label: 'New User',
  },
]

const routesConfig: RouteConfig[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    label: 'Dashboard',
  },
  {
    path: '/',
    element: <Index />,
    label: 'Index',
  },
  ...customerRoutes,
  ...timeRoutes,
  ...taskRoutes,
  ...invoiceRoutes,
  ...deductionRoutes,
  {
    path: '/admin/users',
    element: <UserIndexPage />,
  },
  ...userRoutes,
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
