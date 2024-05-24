import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import ProTable, { ColumnType, RecordType } from '@/components/ProTable'
import { Link as RouterLink } from 'react-router-dom'

const mockData: RecordType[] = [
  {
    id: 1,
    name: 'asdf',
    address: 'Hello',
    telephone: 'telephone',
    customer_type: 'person',
    email: 'hello@computer.com',
  },
  {
    id: 2,
    name: 'asdf1',
    address: 'Hello1',
    telephone: 'telephone2',
    customer_type: 'customer',
    email: 'hello1@computer.com',
  },
]

const columns: ColumnType[] = [
  {
    key: 'name',
    name: 'Name',
    render: (value, record) => {
      return (
        <Box>
          <Box display="flex" gap="5px">
            <Chip
              label={value.slice(0, 2)}
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
  { key: 'telephone', name: 'Telephone' },
  {
    key: 'customer_type',
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

const InvoiceIndex = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Invoices </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
          component={RouterLink}
          to="/invoices/new"
        >
          Create Invoice
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
        Here is the overview of your various invoices 🤝 You also have the
        option to create new ones and edit existing ones
      </Alert>

      <ProTable columns={columns} data={mockData} />
    </Box>
  )
}

export default InvoiceIndex
