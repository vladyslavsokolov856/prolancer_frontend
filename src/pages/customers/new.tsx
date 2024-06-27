import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import CustomerForm from '@/components/Form/CustomerForm'
import { Inputs } from '@/components/Form/CustomerForm'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useCreateCustomer } from '@/hooks/useCustomers'
import { useEffect } from 'react'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const CreateCustomer = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const form = useForm<Inputs>()
  const { isCreating, isCreated, createCustomerMutation } = useCreateCustomer()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createCustomerMutation(data)
  }

  useEffect(() => {
    if (isCreated) {
      enqueueSnackbar('Customer Created!', { variant: 'success' })
      navigate('/customers')
    }
  }, [isCreated])

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Create customer</Title>

      <CustomerForm
        form={form}
        onSubmit={onSubmit}
        submitButtonDisabled={isCreating}
      />
    </Box>
  )
}

export default CreateCustomer
