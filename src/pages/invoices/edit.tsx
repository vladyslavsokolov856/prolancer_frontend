import { useCallback, useEffect } from 'react'
import InvoiceForm, { InvoiceInputs } from '@/components/Form/InvoiceForm'
import { Box, CircularProgress, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useInvoice, useUpdateInvoice } from '@/hooks/useInvoices'
import { useOrderLines } from '@/hooks/useOrderLines'
import dayjs from 'dayjs'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const EditInvoice = () => {
  const { invoiceId = '' } = useParams()
  const navigate = useNavigate()

  const { data: invoice } = useInvoice(invoiceId || '')
  const { orderLines } = useOrderLines()

  useEffect(() => {
    if (invoice && invoice.status !== 'draft') {
      navigate('/invoices')
    }
  }, [invoice, navigate])

  const { mutate: updateInvoice } = useUpdateInvoice()

  const handleSubmit = useCallback(
    ({ ...data }: InvoiceInputs) => {
      updateInvoice(
        { ...data, id: invoiceId },
        {
          onSuccess: () => {
            navigate('/invoices')
          },
        }
      )
    },
    [invoiceId, navigate, updateInvoice]
  )

  if (!invoice) {
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
      <Title>Edit invoice</Title>

      <InvoiceForm
        onSubmit={handleSubmit}
        type="update"
        initialValues={{
          ...invoice,
          order_lines: orderLines.filter(
            ({ invoice_id }) => invoice_id == parseInt(invoiceId)
          ),
          payment_days: invoice.payment_days.toString(),
          invoice_date: dayjs(invoice.invoice_date),
        }}
      />
    </Box>
  )
}

export default EditInvoice
