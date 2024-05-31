import { Box, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import DeductionForm, { DeductionInputs } from '@/components/Form/DeductionForm'
import { useCreateDeduction } from '@/hooks/useDeductions'

const CreateDeduction = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { mutate: createDeduction } = useCreateDeduction()

  const handleSubmit = (values: DeductionInputs) => {
    createDeduction(values, {
      onSuccess: () => {
        enqueueSnackbar('Deduction Created!', { variant: 'success' })
        navigate(-1)
      },
    })
  }

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Typography variant="h4" marginBottom={2}>
        Create deduction{' '}
      </Typography>

      <DeductionForm onSubmit={handleSubmit} />
    </Box>
  )
}

export default CreateDeduction
