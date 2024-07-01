import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useParams } from 'react-router-dom'
import { useDeduction, useDeleteDeduction } from '@/hooks/useDeductions'
import { useTasks } from '@/hooks/useTasks'
import { useMemo, useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import ConfirmDialog from '@/components/ConfirmDialog'

const DeductionDetails = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { deductionId = '' } = useParams()
  const { deleteDeductionMutation, isDeleted } = useDeleteDeduction()
  const [open, setOpen] = useState<boolean>(false)
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

  const {
    isLoading: isDeductionLoading,
    isError,
    data: deduction,
  } = useDeduction(deductionId || '')
  const { isLoading: isTaskLoading, tasks } = useTasks()

  const deductionData = useMemo(
    () =>
      deduction
        ? {
            ...deduction,
            task: tasks.find((task) => task.id === deduction.task_id),
          }
        : null,
    [tasks, deduction]
  )
  const handleDeleteClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (isDeleted) {
      enqueueSnackbar('Deduction Deleted!', { variant: 'success' })
      navigate('/deductions')
    }
  }, [isDeleted, enqueueSnackbar, navigate])

  if (isDeductionLoading || isTaskLoading) {
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

  if (isError && !deduction) {
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
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Typography variant="h4" marginBottom={2}>
        Deduction
      </Typography>

      <Box display="flex" justifyContent="flex-end" sx={{ gap: '10px' }}>
        <Button
          startIcon={<CalendarTodayOutlinedIcon />}
          component={RouterLink}
          to="/deductions/new"
          variant="contained"
          color="primary"
        >
          Create Deduction
        </Button>
        <Button
          startIcon={<EditOutlinedIcon />}
          component={RouterLink}
          to={`/deductions/${deductionId}/edit`}
          variant="contained"
          color="primary"
        >
          Edit deduction
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlinedIcon />}
          onClick={() => handleDeleteClick()}
        >
          Delete
        </Button>
      </Box>

      <Card>
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>{deductionData?.description}</span>
              <Box display="flex" sx={{ gap: '5px' }} alignItems="center">
                <span style={{ fontSize: '20px', fontWeight: 600 }}>
                  #{deductionData?.id}
                </span>
                <Chip
                  label={deductionData?.status}
                  color="primary"
                  size="small"
                  sx={{ borderRadius: '2px' }}
                />
              </Box>
            </Box>
          }
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '25px',
              fontWeight: 700,
              color: 'rgb(108,117,125)',
            },
            borderBottom: '1px solid rgb(200,200,200)',
          }}
        />
        <CardContent sx={{ paddingLeft: '25px', paddingRight: '25px' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6" color="rgb(160, 160, 160)">
                Task
              </Typography>
              <a
                href={`/tasks/${deductionData?.task?.id}`}
                style={{ color: 'blue' }}
              >
                {deductionData?.task?.title}
              </a>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '0px' }}>
            <Grid item xs={4}>
              <Typography variant="h6" color="rgb(160, 160, 160)">
                Total
              </Typography>
              <span style={{ fontSize: '15px' }}>{`${
                deductionData?.currency
              } ${deductionData?.amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</span>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" color="rgb(160, 160, 160)">
                Include VAT
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  color: deductionData?.include_vat ? 'green' : 'red',
                  gap: '5px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: deductionData?.include_vat
                      ? 'green'
                      : 'red',
                  }}
                />
                {deductionData?.include_vat ? 'Yes' : 'No'}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" color="rgb(160, 160, 160)">
                Created Date
              </Typography>
              <span style={{ fontSize: '15px' }}>
                {dayjs(deductionData?.created_at).format('M/DD/YYYY')}
              </span>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: '30px' }}>
        <CardContent>
          {deductionData?.image_url && (
            <iframe
              src={`${VITE_BACKEND_URL}${deductionData?.image_url}`}
              style={{ width: '100%', height: '500px' }}
            />
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`Delete Deduction ${deductionId}`}
        content="Are you sure you want to delete this deduction?"
        onSubmit={() => deleteDeductionMutation(deductionId)}
      />
    </Box>
  )
}

export default DeductionDetails
