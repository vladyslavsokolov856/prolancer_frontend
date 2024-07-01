import CustomerForm, { Inputs } from '@/components/Form/CustomerForm'
import { useCustomer, useEditCustomer } from '@/hooks/useCustomers'
import { Box, CircularProgress, styled } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const EditCustomer = () => {
  const { customerId } = useParams()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { customer, isLoading } = useCustomer(parseInt(customerId || ''))
  const { isEditing, isEdited, updateCustomerMutation } = useEditCustomer(
    parseInt(customerId || '')
  )
  const form = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updateCustomerMutation(data)
  }

  useEffect(() => {
    if (isEdited) {
      enqueueSnackbar('Customer Edited!', { variant: 'success' })
      navigate('/customers')
    }
  }, [isEdited, enqueueSnackbar, navigate])

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

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Edit user</Title>

      <CustomerForm
        form={form}
        onSubmit={onSubmit}
        submitButtonDisabled={isEditing}
        type="Update"
        initialValues={customer}
      />
    </Box>
  )
}

export default EditCustomer
