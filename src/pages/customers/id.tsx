import dayjs from 'dayjs'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  styled,
  Chip,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { useCustomer, useDeleteCustomer } from '@/hooks/useCustomers'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import {
  CheckCircleOutlineOutlined,
  HighlightOffOutlined,
  MoreHorizOutlined,
  PhoneOutlined,
  TextSnippetOutlined,
} from '@mui/icons-material'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined'
import { useInvoices } from '@/hooks/useInvoices'
import { useTasks } from '@/hooks/useTasks'
import { useOrderLines } from '@/hooks/useOrderLines'
import InvoiceSummary from '@/components/Utils/InvoiceSummary'
import ProTable, { ColumnType } from '@/components/ProTable'
import Invoice from '@/types/invoices'
import OrderLine from '@/types/orderLines'
import Customer from '@/types/customers'
import Task from '@/types/tasks'
import { TaskWorkLogPdf } from '@/components/Pdf/TaskWorkLogPdf'
import { pdf } from '@react-pdf/renderer'
import { useWorkLogs } from '@/hooks/useWorkLogs'
import { useUsers } from '@/hooks/useUsers'
import { useJobTypes } from '@/hooks/useJobTypes'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useNavigate } from 'react-router'

const taskStatus = [
  { key: 'approved', name: 'Approved' },
  { key: 'canceled', name: 'Canceled' },
  { key: 'changes_requrested', name: 'Changes requested' },
  { key: 'pending', name: 'Pending' },
  { key: 'denied', name: 'Denied' },
  { key: 'draft', name: 'Draft' },
  { key: 'more_info_added', name: 'More Info needed' },
]

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'black',
})

const InfoTitle = styled('h6')({
  color: 'black',
  fontWeight: 700,
  fontSize: '22px',
})

const statusColors: { [key: string]: any } = {
  cancelled: 'default',
  draft: 'secondary',
  sent: 'primary',
}

const statusFilter = {
  name: 'Status',
  type: 'select',
  key: 'status',
  items: [
    { key: 'approved_by_company', name: 'Approved by company' },
    { key: 'awaiting_task_approval', name: 'Awaiting task approval' },
    { key: 'cancelled', name: 'Cancelled' },
    { key: 'company_dispute', name: 'Company Dispute' },
    { key: 'debt_collection', name: 'Debt Collection' },
    { key: 'denied_by_company', name: 'Denied by Company' },
    { key: 'draft', name: 'Draft' },
    { key: 'late_payment', name: 'Late Payment' },
    { key: 'more_info_needed', name: 'More info needed' },
    { key: 'paid', name: 'Paid' },
    { key: 'payment_on_hold', name: 'Payment on hold' },
    { key: 'payment_received', name: 'Payment received' },
    { key: 'pending', name: 'Pending' },
    { key: 'salary_paid', name: 'Salary Paid' },
    {
      key: 'salary_paid_customer_not_paid',
      name: 'Salary paid - customer not paid',
    },
    { key: 'salary_paid_customer_paid', name: 'Salary paid - customer paid' },
    { key: 'sent', name: 'Sent' },
    { key: 'sent_to_company', name: 'Sent to Company' },
    {
      key: 'sent_to_company_awaiting_approval',
      name: 'Sent to company - Awaiting approval',
    },
    {
      key: 'sent_to_company_contract_made',
      name: 'Sent to company - contract made',
    },
    {
      key: 'sent_to_company_needs_contract',
      name: 'Sent to company - needs contract',
    },
    { key: 'none', name: 'None' },
  ],
}

interface InvoiceTableProps {
  invoices: Invoice[]
  orderLines: OrderLine[]
  customer: Customer
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  orderLines,
  customer,
}) => {
  const filters = useMemo(
    () => [
      {
        name: 'Customer reference',
        type: 'select',
        key: 'customer_id',
        items: [],
      },
      {
        name: 'Invoice date',
        type: 'date',
        key: '_invoice_date',
      },
      {
        name: 'Invoice date before',
        type: 'date',
        key: '_invoice_date_before',

        filterFunction: (itemValue: string, filterValue: string) => {
          return dayjs(itemValue) < dayjs(filterValue)
        },
      },
      statusFilter,
    ],
    []
  )

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: '_customer',
        name: 'Customer',
      },
      {
        key: 'amount',
        name: 'Amount',
        render: (amount, record) => {
          if (amount != null) {
            return `${record.currency} ${new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(amount)}`
          }
        },
      },
      {
        key: 'status',
        name: 'Status',
        render: (status: keyof typeof statusColors) => {
          const color = statusColors[status]
          return status ? (
            <Chip
              label={status}
              color={color || 'default'}
              sx={{ borderRadius: '2px' }}
              size="small"
            />
          ) : null
        },
      },
      {
        key: 'invoice_date',
        name: 'Invoice date',
        render: (date) => dayjs(date).format('M/D/YYYY'),
      },
    ],
    []
  )

  const formattedInvoices = invoices.map((invoice) => {
    const date = invoice.invoice_date
    const amount = orderLines.reduce((acc, next) => {
      if (next.invoice_id == invoice.id) {
        const quantity = next.quantity || 0
        const unitPrice = +next.unit_price || 0
        acc += quantity * unitPrice
      }
      return acc
    }, 0)
    const currency = invoice.currency || 'DKK'
    const invoiceDate = dayjs(date).format('M/D/YYYY')
    const newInvoice = {
      ...invoice,
      amount,
      currency,
      _amount: `${currency} ${new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)}`,
      _customer:
        customer &&
        (customer.type === 'private'
          ? customer.name_contact_person
          : customer.company_name),
      _invoice_date: invoiceDate,
      _invoice_date_before: invoiceDate,
    }
    return newInvoice
  })

  return (
    <>
      <ProTable
        columns={columns}
        data={formattedInvoices}
        filters={filters}
        BeforeTableComponent={InvoiceSummary}
        tableName="invoices"
      />
    </>
  )
}

interface TaskTableProps {
  tasks: Task[]
  customer: Customer
}

interface ITabItem {
  label: string
  clicked: boolean
  handleClick: () => void
}

const TabItem: React.FC<ITabItem> = ({ label, clicked, handleClick }) => {
  return (
    <Box
      sx={{
        padding: '10px',
        borderRadius: '.25rem',
        marginBottom: '10px',
        marginRight: '8px',
        border: 'none',
        backgroundColor: clicked ? '#313a46' : 'rgba(238, 242, 247, .659)',
        color: clicked ? '#fff' : '#6c757d',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {label}
    </Box>
  )
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, customer }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { workLogs } = useWorkLogs()
  const { users } = useUsers()
  const { data: jobTypes } = useJobTypes()
  const [selectedRow, setSelectedRow] = useState<Task | null>(null)

  const handleClick = useCallback(
    (record: Task) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
      setSelectedRow(record)
    },
    []
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setSelectedRow(null)
  }, [])

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: 'title',
        name: 'Name',
        render: (value, record) => {
          return (
            <Box>
              <Box display="flex" gap="5px">
                <Chip
                  label={value ? value.slice(0, 2) : ''}
                  size="small"
                  sx={{
                    borderRadius: '0.25rem',
                    minWidth: '40px',
                    height: '22px',
                    color: 'white',
                    backgroundColor: 'rgb(213, 214, 217) !important',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{ gap: '10px' }}
                >
                  <b style={{ fontSize: '15px' }}>{value}</b>
                  <span>{record.reference}</span>
                </Box>
              </Box>
            </Box>
          )
        },
      },
      {
        key: 'is_retainer',
        name: 'Retainer',
        render: (value, record) => (
          <Box>
            {value ? (
              <Box
                display="flex"
                alignItems="center"
                sx={{ fontSize: '14.4px', color: '#6c757d', gap: '10px' }}
              >
                <CheckCircleOutlineOutlined
                  sx={{ color: 'green', width: '20px', height: '20px' }}
                />
                {`${record.minutes_spent || 0} mins / ${(
                  record.expected_minutes / 60.0
                ).toFixed(2)} hrs`}
              </Box>
            ) : (
              <HighlightOffOutlined
                sx={{ color: 'red', width: '20px', height: '20px' }}
              />
            )}
          </Box>
        ),
      },
      {
        key: 'status',
        name: 'Status',
        render: (value) => (
          <Chip
            label={value}
            color="primary"
            size="small"
            sx={{ borderRadius: '2px' }}
          />
        ),
      },
      {
        key: 'start_date',
        name: 'Start date',
        render: (value) => dayjs(value).format('M/DD/YYYY'),
      },
      {
        key: 'end_date',
        name: 'End date',
        render: (value) => dayjs(value).format('M/DD/YYYY'),
      },
      {
        key: 'id',
        name: '',
        render: (value, record) => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ gap: '10px' }}
          >
            <Button
              id="action-button"
              aria-controls={open ? 'action-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick(record as Task)}
              variant="outlined"
              size="small"
              sx={{ minWidth: '50px' }}
            >
              <MoreHorizOutlined />
            </Button>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'action-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={async () => {
                  const blob = await pdf(
                    <TaskWorkLogPdf
                      task={selectedRow!}
                      workLogs={workLogs.filter(
                        (workLog) => workLog.task_id === selectedRow!.id
                      )}
                    />
                  ).toBlob()
                  const url = URL.createObjectURL(blob)

                  const a = document.createElement('a')
                  a.href = url
                  a.download = `task-work-log-${selectedRow!.id}.pdf`
                  a.click()

                  URL.revokeObjectURL(url)
                  handleClose()
                }}
              >
                <Box display="flex" alignItems="center" sx={{ gap: '10px' }}>
                  <TextSnippetOutlined />
                  Download time registration
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        ),
      },
    ],
    [open, anchorEl, handleClick, handleClose, selectedRow, workLogs]
  )

  const taskData = useMemo(
    () =>
      tasks.map((task) => {
        const user = users.find((user) => user.id === task.user_id)
        return {
          ...task,
          customer_name: customer?.name_contact_person,
          customer_address: customer?.address,
          customer_city: customer?.city,
          customer_postal_code: customer?.postal_code,
          user_name:
            user &&
            (user.display_name || `${user.first_name} ${user.last_name}`),
          job_type_name: (jobTypes || []).find(
            (jobType) => jobType.id === task.job_type_id
          )?.name,
        }
      }),
    [tasks, customer, jobTypes, users]
  )

  return (
    <ProTable
      columns={columns}
      data={taskData || []}
      filters={[
        {
          key: 'customer_id',
          name: 'Customer',
          items: [],
        },
        {
          key: 'status',
          name: 'Status',
          items: taskStatus,
        },
      ]}
      tableName="tasks"
    />
  )
}

const CustomerDetails = () => {
  const { customerId } = useParams()
  const { customer, isLoading: isCusLoading } = useCustomer(
    parseInt(customerId || '')
  )
  const { invoices, isLoading: isInvoicesLoading } = useInvoices()
  const { delteCustomerMutation: deleteCustomer } = useDeleteCustomer()
  const { tasks, isLoading: isTasksLoading } = useTasks()
  const { orderLines, isLoading: isOrderLinesLoading } = useOrderLines()
  const [selectedTabItem, setSelectedTabItem] = useState('invoices')
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const navigate = useNavigate()

  const invoiceData = useMemo(
    () =>
      invoices && customerId
        ? invoices.filter(
            (invoice) => invoice.customer_id === parseInt(customerId)
          )
        : [],
    [invoices, customerId]
  )

  if (
    isCusLoading ||
    isInvoicesLoading ||
    isTasksLoading ||
    isOrderLinesLoading
  ) {
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

  const customerType = customer?.type === 'organization' ? 'company' : 'Private'

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title>Customer</Title>

        <Box display="flex" sx={{ gap: '10px' }}>
          <Button
            variant="contained"
            startIcon={<DescriptionOutlinedIcon />}
            sx={{ height: '38px' }}
            component={RouterLink}
            to={`/invoices/new?task&customer_id=${customer?.id}`}
          >
            Create invoice
          </Button>
          <Button
            variant="contained"
            startIcon={<AssignmentOutlinedIcon />}
            sx={{ height: '35px' }}
            component={RouterLink}
            to={`/tasks/new?task&customer_id=${customer?.id}`}
          >
            Create task
          </Button>
          <Button
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            sx={{ height: '35px' }}
            component={RouterLink}
            to={`/customers/${customerId}/edit`}
          >
            Edit customer
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ height: '35px' }}
            onClick={() => setOpenConfirm(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Card sx={{ marginTop: '10px' }}>
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <InfoTitle>Software</InfoTitle>
              <Chip
                label={`${customerType}`}
                size="small"
                sx={{ borderRadius: '2px' }}
                color="success"
              />
            </Box>
          }
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, .125)' }}
        />
        <CardContent
          sx={{
            paddingLeft: '25px',
            paddingRight: '25px',
            color: '#6c757d',
            fontWeight: 400,
            fontSize: '14.4px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PersonOutlinedIcon />
                  {customer?.name_contact_person}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <EmailOutlined />
                  {customer?.email_contact_person}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneOutlined />
                  {customer?.phone_contact_person}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarTodayOutlined />
                  {'8/25/2024'}
                </Box>
                <span style={{ color: 'rgb(152, 166, 173)', fontWeight: 700 }}>
                  Language
                </span>
                <span>{customer?.language.slice(0, 2).toUpperCase()}</span>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                <span style={{ color: 'rgb(152, 166, 173)', fontWeight: 700 }}>
                  Address
                </span>
                <span>{customer?.address}</span>
                <span>{customer?.city}</span>
                <span>{customer?.postal_code}</span>
                <span>{customer?.country}</span>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                <span style={{ color: 'rgb(152, 166, 173)', fontWeight: 700 }}>
                  CVR
                </span>
                <span style={{ minHeight: '20px' }}>{}</span>
                <span style={{ color: 'rgb(152, 166, 173)', fontWeight: 700 }}>
                  EAN
                </span>
                <span>{customer?.ean}</span>
                <span style={{ color: 'rgb(152, 166, 173)', fontWeight: 700 }}>
                  Payment due days
                </span>
                <span>{customer?.payment_due_days}</span>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display="flex" sx={{ gap: '10px', marginTop: '15px' }}>
        <TabItem
          label="Invoices"
          clicked={selectedTabItem === 'invoices'}
          handleClick={() => setSelectedTabItem('invoices')}
        />
        <TabItem
          label="Tasks"
          clicked={selectedTabItem === 'tasks'}
          handleClick={() => setSelectedTabItem('tasks')}
        />
        <TabItem
          label="Offers"
          clicked={selectedTabItem === 'offers'}
          handleClick={() => setSelectedTabItem('offers')}
        />
      </Box>

      {selectedTabItem === 'invoices' && (
        <InvoiceTable
          invoices={invoiceData}
          customer={customer!}
          orderLines={orderLines}
        />
      )}

      {selectedTabItem === 'tasks' && (
        <TaskTable tasks={tasks} customer={customer!} />
      )}

      {selectedTabItem === 'offers' && <ProTable columns={[]} data={[]} />}

      <ConfirmDialog
        title="Are you sure that you wish to delete this item?"
        content=""
        open={openConfirm}
        setOpen={setOpenConfirm}
        cancelText="Cancel"
        submitText="Delete"
        onSubmit={() => {
          deleteCustomer(customerId, {
            onSuccess: () => {
              setOpenConfirm(false)
              navigate('/customers')
            },
          })
        }}
      />
    </Box>
  )
}

export default CustomerDetails
