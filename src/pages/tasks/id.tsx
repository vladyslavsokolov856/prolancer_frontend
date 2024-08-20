import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  styled,
} from '@mui/material'
import { useParams } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { useTask } from '@/hooks/useTasks'
import { useCustomers } from '@/hooks/userCustomers'
import { useMemo, useState } from 'react'
import { useJobTypes } from '@/hooks/useJobTypes'
import dayjs from 'dayjs'
import FormDialog from '@/components/FormDialog'
import DeductionForm, {
  DeductionInputs as DeductionFormInputs,
} from '@/components/Form/DeductionForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateDeduction } from '@/hooks/useDeductions'
import { useSnackbar } from 'notistack'
import WorkLogForm, {
  Inputs as WorkLogFormInputs,
} from '@/components/Form/WorkLogForm'
import { useCreateWorkLog, useWorkLogs } from '@/hooks/useWorkLogs'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { DeductionTable } from '../deductions'
import { InvoiceTable } from '../invoices'
import { WorkLogList } from '../time'
import { pdf } from '@react-pdf/renderer'
import { TaskWorkLogPdf } from '@/components/Pdf/TaskWorkLogPdf'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

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

interface IBadge {
  value: boolean | null | undefined
}

const Badge: React.FC<IBadge> = ({ value }) => (
  <Box
    display="flex"
    alignItems="center"
    sx={{
      color: value ? 'green' : 'red',
      gap: '5px',
    }}
  >
    <div
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: value ? 'green' : 'red',
      }}
    />
    {value ? 'Yes' : 'No'}
  </Box>
)

const paymentTypes = [
  { key: 'per_day', name: 'Per day' },
  { key: 'per_hour', name: 'Per hour' },
  { key: 'project_price', name: 'Project price' },
]

const paymentTerms = [
  { key: 'current_month', name: 'Current month' },
  { key: 'onging_week', name: 'Onging week' },
  { key: 'other', name: 'Other' },
  { key: 'task_end', name: 'Task end' },
]

const TaskDetailPage = () => {
  const { taskId } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const { task, isLoading: isTaskLoading } = useTask(parseInt(taskId || ''))
  const { customers, isLoading: isCustomersLoading } = useCustomers()
  const { data: jobTypes, isLoading: isJobTypesLoading } = useJobTypes()
  const { mutate: createDeductionMutation } = useCreateDeduction()
  const { createWorkLogMutation } = useCreateWorkLog()
  const [formType, setFormType] = useState<'Deduction' | 'WorkLog'>('Deduction')
  const workLogHookForm = useForm<WorkLogFormInputs>()
  const { workLogs } = useWorkLogs()

  const [selectedTab, setSelectedTab] = useState('work_log')

  const taskData = useMemo(
    () => ({
      ...task,
      customer: customers?.find(
        (customer) => customer.id === task?.customer_id
      ),
      jobType: jobTypes?.find((jobType) => jobType.id === task?.job_type_id),
      paymentType: paymentTypes.find(
        (paymentType) => paymentType.key === task?.payment_type
      )?.name,
      paymentTerm: paymentTerms.find((item) => item.key === task?.payment_term)
        ?.name,
    }),
    [task, customers, jobTypes]
  )

  const onDeductionFormSubmit: SubmitHandler<DeductionFormInputs> = async (
    data
  ) => {
    createDeductionMutation(data, {
      onSuccess: () => {
        enqueueSnackbar('Deduction created!', { variant: 'success' })
        setShowDialog((prev) => !prev)
      },
    })
  }

  const onWorkLogFormSubmit: SubmitHandler<WorkLogFormInputs> = async (
    data
  ) => {
    createWorkLogMutation(
      {
        ...data,
        start_time: dayjs(data.start_time).format('M/D/YYYY, h:mm:ss A'),
        status: 'draft',
        task_id: parseInt(taskId!),
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Work Log created!', { variant: 'success' })
          setShowDialog((prev) => !prev)
        },
      }
    )
  }

  if (isTaskLoading || isCustomersLoading || isJobTypesLoading) {
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
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Title>Task</Title>
        <Box display="flex" sx={{ gap: '10px' }}>
          <Button
            variant="contained"
            startIcon={<ContentCopyOutlinedIcon />}
            component={RouterLink}
            to={`/tasks/new?taskId=${taskId}`}
            sx={{ maxHeight: '40px' }}
          >
            Copy
          </Button>
          <Button
            variant="contained"
            startIcon={<ReceiptOutlinedIcon />}
            component={RouterLink}
            to="/invoices/new"
            sx={{ maxHeight: '40px' }}
          >
            Create invoice
          </Button>
          <Button
            variant="contained"
            startIcon={<AssignmentOutlinedIcon />}
            component={RouterLink}
            to="/tasks/new"
            sx={{ maxHeight: '40px' }}
          >
            Create task
          </Button>
          {taskData?.status === 'draft' && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/tasks/${taskId}/edit`}
              sx={{ maxHeight: '40px' }}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>

      <Card sx={{ marginTop: '20px' }}>
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>{taskData?.title}</span>
              <Chip
                label={taskData?.status}
                color="primary"
                size="small"
                sx={{ borderRadius: '2px' }}
              />
            </Box>
          }
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '20px',
              fontWeight: 700,
              color: 'rgb(108,117,125)',
            },
            borderBottom: '1px solid rgb(200,200,200)',
          }}
        />
        <CardContent sx={{ paddingLeft: '25px', paddingRight: '25px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  color: 'white',
                  backgroundColor: 'rgb(0,66,196)',
                  fontSize: '20px',
                  paddingLeft: '10px',
                  fontWeight: 700,
                }}
              >
                Task Information
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ gap: '10px' }}
                  >
                    <Box sx={{ marginTop: '10px' }}>
                      <InfoTitle>Customer reference</InfoTitle>
                      <InfoContent>{taskData?.reference}</InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Job Type</InfoTitle>
                      <InfoContent>{taskData?.jobType?.name}</InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Payment Type</InfoTitle>
                      <InfoContent>{taskData?.paymentType}</InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Number of hours</InfoTitle>
                      <InfoContent>{taskData?.expected_minutes}</InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>PO Number</InfoTitle>
                      <InfoContent>
                        {taskData?.purchase_order_number}
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Retainer</InfoTitle>
                      <InfoContent>
                        <Badge value={taskData?.is_retainer} />
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Time spent (minutes)</InfoTitle>
                      <InfoContent>{taskData?.minutes_spent}</InfoContent>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ gap: '10px' }}
                  >
                    <Box sx={{ marginTop: '10px' }}>
                      <InfoTitle>Start date</InfoTitle>
                      <InfoContent>
                        {dayjs(taskData?.start_date).format('DD/MM/YYYY')}
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>End date</InfoTitle>
                      <InfoContent>
                        {dayjs(taskData?.end_date).format('DD/MM/YYYY')}
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Payment amount</InfoTitle>
                      <InfoContent>
                        {`${taskData?.payment_amount
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${
                          taskData?.currency
                        }$`}
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Request mileages</InfoTitle>
                      <InfoContent>
                        <Badge value={taskData?.request_allow_mileages} />
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Request mileages</InfoTitle>
                      <InfoContent>
                        <Badge value={taskData?.allow_mileages} />
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Request mileages</InfoTitle>
                      <InfoContent>
                        <Badge value={taskData?.show_customer_price} />
                      </InfoContent>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  color: 'white',
                  backgroundColor: 'rgb(0,66,196)',
                  fontSize: '20px',
                  paddingLeft: '10px',
                  fontWeight: 700,
                }}
              >
                Customer
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ gap: '10px' }}
                  >
                    <Box sx={{ marginTop: '10px' }}>
                      <InfoTitle>Customer name</InfoTitle>
                      <InfoContent>
                        <a
                          href={`/customers/${taskData?.customer?.id}`}
                          style={{
                            marginRight: '30px',
                            color: 'blue',
                            fontWeight: 300,
                          }}
                        >
                          {taskData?.customer?.company_name}
                        </a>
                        <Chip
                          label={taskData?.customer?.type}
                          color="success"
                          size="small"
                          sx={{ borderRadius: '2px', marginRight: '5px' }}
                        />
                        <Chip
                          label={`id: ${taskData?.customer?.id}`}
                          size="small"
                          sx={{ borderRadius: '2px' }}
                        />
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Customer contact</InfoTitle>
                      <InfoContent>
                        {taskData?.customer?.name_contact_person}
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Customer email</InfoTitle>
                      <InfoContent>
                        <a style={{ color: 'blue' }}>
                          {taskData?.customer?.email_contact_person}
                        </a>
                      </InfoContent>
                    </Box>

                    <Box>
                      <InfoTitle>Address</InfoTitle>
                      <InfoContent>{taskData?.customer?.address}</InfoContent>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: '30px' }}>
        <CardContent sx={{ margin: '30px' }}>
          <Box
            sx={{
              color: 'white',
              backgroundColor: 'rgb(0,66,196)',
              fontSize: '20px',
              paddingLeft: '10px',
              fontWeight: 700,
            }}
          >
            Task description
          </Box>

          <div style={{ marginTop: '10px' }}>{taskData?.description}</div>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: '30px' }}>
        <CardContent sx={{ margin: '30px' }}>
          <Box
            sx={{
              color: 'white',
              backgroundColor: 'rgb(0,66,196)',
              fontSize: '20px',
              paddingLeft: '10px',
              fontWeight: 700,
            }}
          >
            Payment
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <Box>
                <InfoTitle>Payment Term</InfoTitle>
                <InfoContent>{taskData?.paymentTerm}</InfoContent>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <Box>
                <InfoTitle>Payment days</InfoTitle>
                <InfoContent>{taskData?.payment_term_days}</InfoContent>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: '30px', padding: '10px' }}>
        <CardContent>
          <Box display="flex" justifyContent="flex-end" sx={{ gap: '10px' }}>
            <Button
              variant="contained"
              startIcon={<InsertDriveFileOutlinedIcon />}
              sx={{
                backgroundColor: 'rgb(200,200,200)',
                color: 'black',
                '& .MuiButtonBase-root': { alignItems: 'stretch' },
              }}
              onClick={async () => {
                if (task) {
                  const blob = await pdf(
                    <TaskWorkLogPdf
                      task={{
                        ...task,
                        user_name: 'Guesmia',
                        customer_name: taskData?.customer?.name_contact_person,
                        customer_address: taskData?.customer?.address,
                        customer_city: taskData?.customer?.city,
                        customer_postal_code: taskData?.customer?.postal_code,
                        job_type_name: taskData?.jobType?.name,
                      }}
                      workLogs={workLogs.filter(
                        (workLog) => workLog.task_id === taskId
                      )}
                    />
                  ).toBlob()
                  const url = URL.createObjectURL(blob)

                  const a = document.createElement('a')
                  a.href = url
                  a.download = `task-work-log-${taskId}.pdf`
                  a.click()

                  URL.revokeObjectURL(url)
                }
              }}
            >
              Download time registration
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setShowDialog(true)
                setFormType('WorkLog')
              }}
            >
              Add time registration
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setShowDialog(true)
                setFormType('Deduction')
              }}
            >
              Create deduction
            </Button>
          </Box>
        </CardContent>
      </Card>

      <FormDialog
        open={showDialog}
        setOpen={setShowDialog}
        title={
          formType === 'Deduction'
            ? 'Create Deduction'
            : 'Add time registration'
        }
        content={
          formType === 'Deduction' ? (
            <DeductionForm onSubmit={onDeductionFormSubmit} />
          ) : (
            <WorkLogForm
              form={workLogHookForm}
              onSubmit={onWorkLogFormSubmit}
            />
          )
        }
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '30px' }}>
        <Tabs
          value={selectedTab}
          onChange={(e, value) => setSelectedTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Time registration" value="work_log" />
          <Tab label="Invoices" value="invoices" />
          <Tab label="Deductions" value="deductions" />
        </Tabs>
      </Box>

      <Box sx={{ marginTop: '15px' }}>
        {selectedTab === 'work_log' && (
          <WorkLogList taskId={parseInt(taskId!)} />
        )}
        {selectedTab === 'deductions' && (
          <DeductionTable taskId={parseInt(taskId!)} />
        )}
        {selectedTab === 'invoices' && (
          <InvoiceTable taskId={parseInt(taskId!)} />
        )}
      </Box>
    </Box>
  )
}

export default TaskDetailPage
