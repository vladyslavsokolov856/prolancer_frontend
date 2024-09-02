import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  styled,
} from '@mui/material'
import Statistic from '@/components/Statistic'
import { Link as RouterLink } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { useTasks } from '@/hooks/useTasks'
import { useInvoices, useUpdateInvoice } from '@/hooks/useInvoices'
import { useCustomers } from '@/hooks/userCustomers'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import Task from '@/types/tasks'
import Customer from '@/types/customers'
import Invoice from '@/types/invoices'
import { useSnackbar } from 'notistack'
import { zitadelConfig } from '@/context/auth'

const InfoTitle = styled('h6')({
  color: 'gray',
  fontWeight: 700,
  fontSize: '14px',
})

const InfoContent = styled('h6')({
  color: 'gray',
  fontWeight: 300,
  fontSize: '14px',
})

interface TaskCardProps {
  task: Task & { customer?: Customer }
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <Card sx={{ marginBottom: '15px' }}>
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: '5px' }}
      >
        <Typography variant="h6">
          <b>{task?.title}</b>
        </Typography>
        <Chip
          label={task?.status}
          color="primary"
          size="small"
          sx={{ borderRadius: '2px' }}
        />
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <Box>
            <InfoTitle>Customer name</InfoTitle>
            <InfoContent>
              <a
                href={`/customers/${task?.customer?.id}`}
                style={{ color: 'blue' }}
              >
                {task?.customer?.name_contact_person}
              </a>
            </InfoContent>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <InfoTitle>Start date</InfoTitle>
            <InfoContent>
              {dayjs(task?.start_date).format('M/DD/YYYY')}
            </InfoContent>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <InfoTitle>End date</InfoTitle>
            <InfoContent>
              {dayjs(task?.end_date).format('M/DD/YYYY')}
            </InfoContent>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: '5px' }}
          >
            <Button
              variant="contained"
              size="small"
              component={RouterLink}
              to={`/tasks/${task?.id}/edit`}
              sx={{ minWidth: '30px' }}
            >
              <EditIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

interface InvoiceCardProps {
  invoice: Invoice & { customer?: Customer; task?: Task }
  onUnsend: () => void
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onUnsend }) => (
  <Card sx={{ marginBottom: '15px' }}>
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: '5px' }}
      >
        <Typography variant="h6">
          <b>{invoice?.customer?.name_contact_person}</b>
        </Typography>
        <Box display="flex" sx={{ gap: '5px' }}>
          <Chip
            label={`#${invoice?.id}`}
            color="default"
            size="small"
            sx={{ borderRadius: '2px' }}
          />
          <Chip
            label={invoice?.status}
            color="primary"
            size="small"
            sx={{ borderRadius: '2px' }}
          />
        </Box>
      </Box>
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'rgb(230, 230, 230)',
          borderRadius: '1px',
          position: 'relative',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            width: '25%',
            height: '10px',
            backgroundColor: '#0142C2',
            borderRadius: '1px',
            position: 'absolute',
          }}
        />
      </div>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box>
            <InfoTitle>Invoice date</InfoTitle>
            <InfoContent>
              {dayjs(invoice?.invoice_date).format('M/DD/YYYY')}
            </InfoContent>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <InfoTitle>
              Amount{' '}
              <span style={{ color: 'rgb(230, 230, 230)' }}>(ex. VAT)</span>
            </InfoTitle>
            <InfoContent>
              {`${invoice?.task?.payment_amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  ${invoice?.currency}`}
            </InfoContent>
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          onClick={() => onUnsend()}
        >
          Unsend
        </Button>
      </Box>
    </CardContent>
  </Card>
)

const Index = () => {
  const { isLoading: isTasksLoading, tasks } = useTasks()
  const { isLoading: isInvoicesLoading, invoices } = useInvoices()
  const { isLoading: isCustomersLoading, customers } = useCustomers()

  const { mutate: updateInvoice } = useUpdateInvoice()
  const { enqueueSnackbar } = useSnackbar()
  
  const zitadelDatakey = `oidc.user:${zitadelConfig.authority}:${zitadelConfig.client_id}`;

  const localStorageUserInfo = localStorage.getItem(zitadelDatakey);
  const localStorageParsedUserInfo = localStorageUserInfo ? JSON.parse(localStorageUserInfo) : null;
  
  const userName = localStorageParsedUserInfo?.profile?.name || null; 
  
  const handleUnsend = (invoiceId: number) => {
    const invoice = invoices.find((item) => item.id === invoiceId)
    const { ...rest } = invoice!
    updateInvoice(
      { ...rest, status: 'draft', id: invoiceId },
      {
        onSuccess: () => {
          enqueueSnackbar('Invoice updated!', { variant: 'success' })
        },
      }
    )
  }

  const taskData = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        customer: customers.find((item) => item.id === task.customer_id),
      })),
    [tasks, customers]
  )

  const invoiceData = useMemo(
    () =>
      invoices
        .filter((invoice) => invoice.status !== 'draft')
        .map((invoice) => ({
          ...invoice,
          customer: customers.find((item) => item.id === invoice.customer_id),
          task: tasks.find((item) => item.id === invoice.task_id),
        })),
    [invoices, customers, tasks]
  )

  const {
    draftCount,
    draftAmount,
    openCount,
    openAmount,
    paidCount,
    paidAmount,
  } = useMemo(() => {
    let draftCount = 0
    let draftAmount = 0
    let openCount = 0
    let openAmount = 0
    let paidCount = 0
    let paidAmount = 0

    invoices.map((invoice) => {
      const task = tasks.find((item) => item.id === invoice.task_id)
      switch (invoice.status) {
        case 'draft':
          draftCount++
          draftAmount += parseFloat(`${task?.payment_amount || 0}`)
          break
        case 'paid':
          paidCount++
          paidAmount += parseFloat(`${task?.payment_amount || 0}`)
          break
        default:
          openCount++
          openAmount += parseFloat(`${task?.payment_amount || 0}`)
          break
      }
    })

    return {
      draftCount,
      draftAmount,
      openCount,
      openAmount,
      paidCount,
      paidAmount,
    }
  }, [invoices, tasks])

  if (isTasksLoading || isInvoicesLoading || isCustomersLoading) {
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
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, marginTop: '10px', marginBottom: '10px' }}
      >
        Hi {userName}, welcome back to Prolancer
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Statistic
            backgroundColor="rgb(108, 117, 125)"
            title="Draft"
            amountContent={`${draftAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kr.`}
            countContent={`${draftCount} invoices`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Statistic
            backgroundColor="#0142c2"
            title="Open"
            amountContent={`${openAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kr.`}
            countContent={`${openCount} invoices`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Statistic
            backgroundColor="#5cb85c"
            title="Paid amount"
            amountContent={`${paidAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kr.`}
            countContent={`${paidCount} invoices`}
          />
        </Grid>
      </Grid>

      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ marginTop: '20px', gap: '10px' }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/customers/new"
        >
          Create Customer
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/tasks/new"
        >
          Create Task
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/invoices/new"
        >
          Create invoice
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/deductions/new"
        >
          Create deduction
        </Button>
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, marginTop: '10px', marginBottom: '10px' }}
        >
          Open invoices
        </Typography>

        {invoiceData.map((invoice) => (
          <InvoiceCard
            invoice={invoice}
            onUnsend={() => handleUnsend(invoice.id)}
            key={invoice?.id}
          />
        ))}
        {invoiceData?.length > 0 && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: '10px' }}
          >
            {`Showing ${invoiceData?.length} entry`}
          </Box>
        )}
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, marginTop: '10px', marginBottom: '10px' }}
        >
          Open tasks
        </Typography>

        {taskData.map((task) => (
          <TaskCard task={task} key={task?.id} />
        ))}

        {tasks?.length > 0 && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: '10px' }}
          >
            {`Showing ${tasks?.length} entry`}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Index
