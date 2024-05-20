import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import ProTable, { ColumnType, RecordType } from '@/components/ProTable'

const columns: ColumnType[] = [
  {
    key: 'name',
    name: 'Name',
    render: (value, record) => {
      return (
        <Box>
          <Box display="flex" gap="5px">
            <Chip label={value.slice(0, 2)} />
            <Box display="flex" flexDirection="column">
              <b>{value}</b>
              <span>{record.email}</span>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  { key: 'address', name: 'Address', render: () => <h1>Hello</h1> },
  { key: 'telephone', name: 'Telephone' },
  { key: 'customer_type', name: 'Customer Type' },
]

const mockData: RecordType[] = [
  {
    name: 'asdf',
    address: 'Hello',
    telephone: 'telephone',
    customer_type: 'person',
    email: 'hello@computer.com',
  },
  {
    name: 'asdf1',
    address: 'Hello1',
    telephone: 'telephone2',
    customer_type: 'person3',
    email: 'hello1@computer.com',
  },
]

const CustomerIndex = () => {
  return (
    <Box sx={{ paddingTop: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Customers </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
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
        }}
      >
        Here is the overview of your various customers 🤝 You also have the
        option to create new ones and edit existing ones
      </Alert>

      <ProTable
        columns={columns}
        data={mockData}
        sortBy={[
          { key: 'name', name: 'Name' },
          { key: 'address', name: 'Address' },
          { key: 'email', name: 'Email' },
          { key: 'created_at', name: 'Created At' },
        ]}
      />
    </Box>
  )
}

export default CustomerIndex
