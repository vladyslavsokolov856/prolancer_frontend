import { Box, Typography, CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import DeductionForm, { DeductionInputs } from '@/components/Form/DeductionForm'
import { useDeduction, useUpdateDeduction } from '@/hooks/useDeductions'
import { useTasks } from '@/hooks/useTasks'
import { } from '@/hooks/useDeductions'
import { useCallback } from 'react'

const EditDeduction = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { deductionId = '' } = useParams()
  const { mutate: updateDeduction } = useUpdateDeduction()

  const {
    isLoading: isDeductionLoading,
    isError,
    data: deduction,
  } = useDeduction(deductionId || '')

  const { isLoading: isTasksLoading } = useTasks()

  const handleSubmit = useCallback(
    ({ ...data }: DeductionInputs) => {
      updateDeduction(
        { ...data, id: deductionId },
        {
          onSuccess: () => {
            enqueueSnackbar('Deduction Edited!', { variant: 'success' })
            navigate('/deductions')
          },
        }
      )
    },
    [deductionId, navigate, updateDeduction]
  )

  if (isDeductionLoading || isTasksLoading) {
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
        Edit Deduction{' '}
      </Typography>

      <DeductionForm onSubmit={handleSubmit} type="update" initialValues={{ ...deduction }} />
    </Box>
  )
}

export default EditDeduction
