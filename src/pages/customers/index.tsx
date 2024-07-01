import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import ProTable, { ColumnType } from '@/components/ProTable'
import { Link as RouterLink } from 'react-router-dom'
import { useCustomers } from '@/hooks/userCustomers'
import { CircularProgress } from '@mui/material'

const columns: ColumnType[] = [
  {
    key: 'name_contact_person',
    name: 'Name',
    render: (value, record) => {
      return (
        <Box>
          <Box display="flex" gap="5px">
            <Chip
              label={value ? value.slice(0, 2) : ''}
              size="small"
              sx={{ borderRadius: '2px' }}
            />
            <Box display="flex" flexDirection="column">
              <b>{value}</b>
              <span>{record.email}</span>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  { key: 'address', name: 'Address' },
  { key: 'phone_contact_person', name: 'Telephone' },
  {
    key: 'type',
    name: 'Customer Type',
    render: (value) => (
      <Chip
        label={value}
        color={value === 'person' ? 'primary' : 'success'}
        size="small"
        sx={{ borderRadius: '2px' }}
      />
    ),
  },
  {
    key: 'id',
    align: 'right',
    render: (value) => (
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        size="small"
        component={RouterLink}
        to={`/customers/${value}/edit`}
      >
        Edit
      </Button>
    ),
  },
]

const CustomerIndex = () => {
  const { customers, isLoading } = useCustomers()

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 100px)' }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Customers </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
          component={RouterLink}
          to="/customers/new"
        >
          Create Customer
        </Button>
      </Box>

      <Alert
        icon={false}
        sx={{
          position: 'relative',
          padding: '.75rem 1.25rem',
          marginBottom: '1rem',
          border: '1px solid transparent',
          marginTop: '20px',
          '& .MuiAlert-message': {
            padding: 0,
          },
        }}
      >
        Here is the overview of your various customers 🤝 You also have the
        option to create new ones and edit existing ones
      </Alert>

      <ProTable columns={columns} data={customers} />
    </Box>
  )
}

export default CustomerIndex
