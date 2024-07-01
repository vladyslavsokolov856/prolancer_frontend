import { Box } from '@mui/material'
import InvoiceForm from '@/components/Form/InvoiceForm'
import { styled } from '@mui/material/styles'
import type { SubmitHandler } from 'react-hook-form'
import { InvoiceInputs } from '@/components/Form/InvoiceForm'
import { useCreateInvoice } from '@/hooks/useInvoices'
import { useNavigate } from 'react-router-dom'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const CreateInvoice = () => {
  const navigate = useNavigate()

  const { mutate: createInvoice } = useCreateInvoice()

  const onSubmit: SubmitHandler<InvoiceInputs> = async ({ ...data }) => {
    console.log(data)
    createInvoice(data, {
      onSuccess: () => navigate('/invoices'),
    })
  }

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Create invoice</Title>

      <InvoiceForm type="create" onSubmit={onSubmit} />
    </Box>
  )
}

export default CreateInvoice
