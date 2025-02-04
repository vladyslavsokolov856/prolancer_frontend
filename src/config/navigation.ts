import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined'
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'

interface NavigationItemConfig {
  label: string
  icon?: React.ComponentType
  to?: string
  type?: string
}

export const navigationConfig: NavigationItemConfig[] = [
  {
    type: 'item',
    label: 'Help Centre',
    icon: HelpOutlinedIcon,
    to: '/da',
  },
  {
    type: 'item',
    label: 'Profile',
    icon: SettingsOutlinedIcon,
    to: '/settings',
  },
  {
    type: 'item',
    label: 'Dashboard',
    icon: SignalCellularAltOutlinedIcon,
    to: '/dashboard',
  },
  {
    type: 'item',
    label: 'Customers',
    icon: ApartmentOutlinedIcon,
    to: '/customers',
  },
  {
    type: 'item',
    label: 'Tasks',
    icon: AssignmentOutlinedIcon,
    to: '/tasks',
  },
  {
    type: 'item',
    label: 'Invoices',
    icon: DescriptionOutlinedIcon,
    to: '/invoices',
  },
  {
    type: 'item',
    label: 'Deductions',
    icon: ReceiptOutlinedIcon,
    to: '/deductions',
  },
  {
    type: 'item',
    label: 'Salary',
    icon: PointOfSaleOutlinedIcon,
    to: '/salary-payments',
  },
  {
    type: 'item',
    label: 'Mileages',
    icon: PlaceOutlinedIcon,
    to: '/mileages',
  },
  {
    type: 'item',
    label: 'Time registration',
    icon: AccessTimeOutlinedIcon,
    to: '/time-registration',
  },
]
