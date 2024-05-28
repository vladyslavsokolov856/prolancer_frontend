import { useCallback } from 'react'
import InvoiceForm from '@/components/Form/InvoiceForm'
import { Box, styled } from '@mui/material'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const EditInvoice = () => {
  const handleSubmit = useCallback(() => {}, [])

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Edit invoice</Title>

      <InvoiceForm onSubmit={handleSubmit} type="update" />
    </Box>
  )
}

export default EditInvoice
