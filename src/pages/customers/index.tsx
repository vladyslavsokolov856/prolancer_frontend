import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import ProTable, { ColumnType, RecordType } from '@/components/ProTable'
import SorterFilterHeader from '@/components/SorterFilterHeader'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useMediaQuery, useTheme } from '@mui/material'

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
  const theme = useTheme()
  const isMedium = useMediaQuery(theme.breakpoints.up('md'))

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

      <SorterFilterHeader
        children={
          <Box sx={{ color: 'rgb(255, 255, 255)' }}>
            <Grid container spacing={2} alignItems="end">
              {isMedium && <Grid item xs={12} md={4}></Grid>}
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column">
                  <span>Sort By</span>
                  <Box display="flex" sx={{ width: '100%' }}>
                    <FormControl
                      fullWidth
                      sx={{ backgroundColor: 'white', flexGrow: 1 }}
                    >
                      <Select size="small">
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="address">Address</MenuItem>
                        <MenuItem value="telephone">Telephone</MenuItem>
                        <MenuItem value="cretaed_at">Created At</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton
                      sx={{
                        borderLeft: '1px solid rgb(221, 221, 221) !important',
                        backgroundColor: '#eef2f7',
                        borderRadius: '0px !important',
                        minWidth: '40px',
                      }}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span>Number of Entities</span>
                  <FormControl
                    fullWidth
                    sx={{ backgroundColor: 'white', width: '100px' }}
                  >
                    <Select size="small">
                      <MenuItem value="25">25</MenuItem>
                      <MenuItem value="50">50</MenuItem>
                      <MenuItem value="100">100</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
        }
      />

      <ProTable columns={columns} data={mockData} />
    </Box>
  )
}

export default CustomerIndex
