import {
  useDeleteInvoice,
  useInvoice,
  useUpdateInvoice,
} from '@/hooks/useInvoices'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CopyIcon from '@mui/icons-material/ContentCopyOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SendIcon from '@mui/icons-material/ArrowRightAltOutlined'
import UnsendIcon from '@mui/icons-material/ArrowBackOutlined'
import { useUser } from '@/hooks/useUsers'
import { useCustomer } from '@/hooks/useCustomers'
import { useTask } from '@/hooks/useTasks'
import dayjs from 'dayjs'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useState } from 'react'
import { useJobType } from '@/hooks/useJobTypes'
import { useOrderLines } from '@/hooks/useOrderLines'

const steps = [
  'Submit invoice',
  'Queued with accounting',
  'Sent to client',
  'Client paid',
  'Salary paid',
]

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none',
}))

const ShowInvoice = () => {
  let { invoiceId = '' } = useParams()

  const {
    data: invoice,
    isLoading,
    isError,
  } = useInvoice(parseInt(invoiceId || ''))
  const { user } = useUser(invoice?.user_id)
  const { customer } = useCustomer(invoice?.customer_id)
  const { task } = useTask(invoice?.task_id)
  const { data: job_type } = useJobType(task?.job_type_id)
  const { orderLines } = useOrderLines()
  const orderLineByInvoiceId = orderLines.filter(
    ({ invoice_id }) => invoice_id === invoice?.id
  )

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogClick = () => setDeleteDialogOpen(true)
  const { deleteInvoiceMutation: deleteInvoice } = useDeleteInvoice()
  const navigate = useNavigate()
  const handleDeleteDialog = () => {
    deleteInvoice(invoice?.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        navigate('/invoices')
      },
    })
  }

  const { mutate: updateInvoice, isPending: isEditing } = useUpdateInvoice()

  const [step, setStep] = useState(0)
  const handleSend = () => {
    updateInvoice(
      { status: 'draft', id: invoiceId },
      {
        onSuccess: () => {
          setStep(1)
        },
      }
    )
  }
  const handleUnsend = () =>
    updateInvoice(
      { status: 'draft', id: invoiceId },
      {
        onSuccess: () => {
          setStep(0)
        },
      }
    )

  const totalAmount =
    orderLines?.reduce((pre, cur) => {
      if (cur.quantity && cur.unit_price)
        return pre + cur.quantity * cur.unit_price
      else return pre
    }, 0) || 0

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

  if (isError && !invoice) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 100px)' }}
      >
        <Typography variant="h1">Not Found</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Invoice </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            startIcon={<CopyIcon />}
            sx={{ height: '35px' }}
            component={Link}
            to={`/invoices/new?invoice&copy_invoice_id=${invoice?.id}`}
          >
            Copy
          </Button>
          {step === 0 && (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ height: '35px' }}
                component={Link}
                to={`/invoices/${invoice?.id}/edit`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{
                  height: '35px',
                }}
                color="error"
                onClick={handleDeleteDialogClick}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                startIcon={
                  isEditing ? (
                    <CircularProgress size={18} color="info" />
                  ) : (
                    <SendIcon />
                  )
                }
                sx={{ height: '35px' }}
                onClick={handleSend}
              >
                Send
              </Button>
            </>
          )}
          {step === 1 && (
            <Button
              variant="contained"
              startIcon={
                isEditing ? (
                  <CircularProgress size={18} color="info" />
                ) : (
                  <UnsendIcon />
                )
              }
              sx={{ height: '35px' }}
              onClick={handleUnsend}
            >
              Unsend
            </Button>
          )}
        </Box>
      </Box>
      <Paper elevation={2} sx={{ paddingY: '50px', marginTop: '20px' }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      <Paper
        sx={{
          marginTop: '20px',
          padding: '20px',
          borderBottom: '1px solid black',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, fontSize: '1.5rem', color: '' }}
        >
          {customer?.name_contact_person}
          {task?.reference && `: ${task.reference}`}
        </Typography>
        <Box
          sx={{
            backgroundColor: step === 0 ? '#ffbf00' : '#0142c2',
            borderRadius: '5px',
            height: '25px',
            fontSize: '12px',
            fontWeight: '600',
            padding: '0px 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginLeft: '20px',
          }}
        >
          {step === 0 ? 'draft' : 'sent'}
        </Box>
      </Paper>
      <Paper sx={{ padding: '30px 20px' }}>
        <Grid container columnSpacing={3}>
          <Grid item md={6} display="flex" justifyContent="center">
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Box
                sx={{
                  padding: '10px',
                  backgroundColor: '#0142c2',
                  width: '100%',
                  color: 'white',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                Invoice information
              </Box>
              <Grid item md={12}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>Task</Box>
                <Link
                  to={`/tasks/${task?.id}`}
                  style={{ textDecoration: 'none', color: '#0142c2' }}
                >
                  {task?.title}
                </Link>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Hours worked
                </Box>
                <Box>
                  {invoice?.hours_worked}{' '}
                  {task?.payment_amount &&
                    invoice?.hours_worked &&
                    `(${invoice.currency} 
                  ${(task?.payment_amount / invoice?.hours_worked).toFixed(
                    2
                  )} /hour)`}
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Invoice date
                </Box>
                <Box>{dayjs(invoice?.invoice_date).format('M/d/YYYY')}</Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Invoice with VAT
                </Box>
                <Box>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      backgroundColor: invoice?.vat_percentage
                        ? '#5cb85c'
                        : '#d9534f',
                    }}
                  ></span>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      fontSize: '.75rem',
                      marginLeft: '.375rem',
                      color: invoice?.vat_percentage ? '#5cb85c' : '#d9534f',
                    }}
                  >
                    {invoice?.vat_percentage ? 'yes' : 'no'}
                  </span>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>Start date</Box>
                <Box>{dayjs(task?.start_date).format('M/d/YYYY')}</Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>Job type</Box>
                <Box>{job_type?.name}</Box>
              </Grid>
              {/* <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Instant payout
                </Box>
                <Box>2 (€2.50 /hour)</Box>
              </Grid> */}
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>End date</Box>
                <Box>{dayjs(task?.end_date).format('M/d/YYYY')}</Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} display="flex" justifyContent="center">
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Box
                sx={{
                  padding: '10px',
                  backgroundColor: '#0142c2',
                  width: '100%',
                  color: 'white',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                Customer
              </Box>
              <Grid item md={12}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>Name</Box>
                <Box display="flex" alignItems="center">
                  <Link
                    to={`/customers/${customer?.id}`}
                    style={{ textDecoration: 'none', color: '#0142c2' }}
                  >
                    {`${customer?.name_contact_person}`}
                  </Link>
                  <Box
                    sx={{
                      backgroundColor: '#5cb85c',
                      borderRadius: '5px',
                      height: '25px',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '0px 5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      marginLeft: '20px',
                    }}
                  >
                    company
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#eef2f7',
                      borderRadius: '5px',
                      height: '25px',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '0px 5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '20px',
                    }}
                  >
                    {`id: ${invoice?.id}`}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Customer contact
                </Box>
                <Box>{customer?.name_contact_person}</Box>
              </Grid>
              <Grid item md={12}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Customer email
                </Box>
                <Box>{user?.email}</Box>
              </Grid>
              <Grid item md={12}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Send invoice copy to
                </Box>
                <Box>{invoice?.send_invoice_copy_to}</Box>
              </Grid>
              <Grid item md={12}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>Address</Box>
                <Box>{customer?.address}</Box>
              </Grid>
              <Grid item md={12}>
                <Box sx={{ color: '#98a6ad', fontWeight: 700 }}>
                  Payment days
                </Box>
                <Box>{invoice?.payment_days}</Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ marginTop: '20px', padding: '30px 20px' }}>
        <Box
          sx={{
            padding: '10px',
            backgroundColor: '#0142c2',
            width: '100%',
            color: 'white',
            fontWeight: 700,
          }}
        >
          Order lines
        </Box>
        <Table size="small" sx={{ marginTop: '10px', fontWeight: 700 }}>
          <TableHead sx={{ backgroundColor: '#313a46' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }} align="left">
                Description
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="left">
                Quantity
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="left">
                Price
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="left">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLineByInvoiceId.map(
              ({ description, quantity, unit_price }) => (
                <TableRow>
                  <StyledTableCell>{description}</StyledTableCell>
                  <StyledTableCell>{quantity}</StyledTableCell>
                  <StyledTableCell>{unit_price}</StyledTableCell>
                  <StyledTableCell>
                    {`${invoice?.currency} ${unit_price * quantity}`}
                  </StyledTableCell>
                </TableRow>
              )
            )}

            <TableRow>
              <StyledTableCell colSpan={2}></StyledTableCell>
              <StyledTableCell align="right">Subtotal</StyledTableCell>
              <StyledTableCell>
                {`${invoice?.currency} ${totalAmount.toFixed(2)}`}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2}></StyledTableCell>
              <StyledTableCell align="right">VAT 25%</StyledTableCell>
              <StyledTableCell>
                {`${invoice?.currency} ${(
                  (totalAmount * (invoice?.vat_percentage || 0)) /
                  100
                ).toFixed(2)}`}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2}></StyledTableCell>
              <StyledTableCell align="right">In total</StyledTableCell>
              <StyledTableCell>
                {`${invoice?.currency} ${(
                  totalAmount *
                  (1 + (invoice?.vat_percentage || 0) / 100)
                ).toFixed(2)}`}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      {deleteDialogOpen && (
        <ConfirmDialog
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title=""
          content="Are you sure that you wish to delete this item?"
          onSubmit={handleDeleteDialog}
        />
      )}
    </Box>
  )
}

export default ShowInvoice
