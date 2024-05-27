import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import { Link } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useInvoices, useDeleteInvoice } from '@/hooks/useInvoices'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ProTable, { ColumnType } from '@/components/ProTable'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ConfirmDialog from '@/components/ConfirmDialog'
import Invoice from '@/types/invoices'
import InvoiceSummary from '@/components/Utils/InvoiceSummary'
import { useCustomers } from '@/hooks/useCustomers'
import { useOrderLines } from '@/hooks/useOrderLines'

type SelectedInvoiceType = Invoice | null | undefined

const statusColors: Record<string, string> = {
  cancelled: 'default',
  draft: 'secondary',
  sent: 'primary',
}

const InvoiceIndex = () => {
  const { invoices } = useInvoices()
  const { customers } = useCustomers()
  const { orderLines } = useOrderLines()
  const { deleteInvoiceMutation } = useDeleteInvoice()

  const [open, setOpen] = useState<boolean>(false)
  const [selectedInvoice, setSelectedInvoice] =
    useState<SelectedInvoiceType>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedInvoice(invoices.find((item) => item.id === id))
    setOpen(true)
  }

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: '_customer',
        name: 'Customer',
      },
      {
        key: 'amount',
        name: 'Amount',
        render: (amount) => {
          if (amount != null) {
            return (
              'DKK ' +
              new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(amount)
            )
          }
        },
      },
      {
        key: 'status',
        name: 'Status',
        render: (status) => {
          const color = statusColors[status]
          return status ? (
            <Chip
              label={status}
              color={color || 'default'}
              sx={{ borderRadius: '2px' }}
              size="small"
            />
          ) : null
        },
      },
      {
        key: 'invoice_date',
        name: 'Invoice date',
        render: (date) => date && new Date(date).toLocaleDateString(),
      },
      {
        key: '_actions',
        align: 'right',
        render: (value, record) =>
          record.status === 'draft' ? (
            <Box display="flex" justifyContent="flex-end" sx={{ gap: '10px' }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                size="small"
                component={RouterLink}
                to={`/invoices/${record.id}/edit`}
                color="secondary"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => handleDeleteClick(record.id)}
                color="error"
              >
                Delete
              </Button>
            </Box>
          ) : null,
      },
    ],
    [handleDeleteClick]
  )

  const totalInvoices = invoices.length
  let totalHours = 0
  let totalAmount = 0
  const formattedInvoices = invoices.map((invoice) => {
    const customer = customers.find(({ id }) => id == invoice.customer_id)
    const date = invoice.invoice_date
    const amount = orderLines.reduce((acc, next) => {
      if (next.invoice_id == invoice.id) {
        const quantity = next.quantity || 0
        const unitPrice = +next.unit_price || 0
        acc += quantity * unitPrice
      }
      return acc
    }, 0)
    const newInvoice = {
      ...invoice,
      amount,
      _amount:
        'DKK ' +
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount),
      _customer:
        customer &&
        (customer.type === 'private'
          ? customer.name_contact_person
          : customer.company_name),
      _invoice_date: date && new Date(date).toLocaleDateString(),
    }
    totalAmount += amount
    totalHours += +invoice.hours_worked || 0
    return newInvoice
  })

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Invoices </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
          component={RouterLink}
          to="/invoices/new"
        >
          Create Invoice
        </Button>
      </Box>

      <Alert
        icon={false}
        sx={{
          position: 'relative',
          padding: '.75rem 1.25rem',
          marginBottom: '1rem',
          border: '1px solid transparent',
          marginTop: '20px',
          '& .MuiAlert-message': {
            padding: 0,
          },
        }}
      >
        Get a comprehensive overview of your invoices. Send an invoice to your
        customer quick and easy and track the invoice status from sent to paid.
        Read more about invoices and the status descriptions{' '}
        <Link
          href="https://intercom.help/factofly/en/articles/5900739-invoice"
          target="_blank"
          referrerPolicy="no-referrer"
          sx={{ textDecoration: 'none' }}
        >
          here <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
      </Alert>

      <ProTable
        columns={columns}
        data={formattedInvoices}
        beforeTable={
          <InvoiceSummary
            totalInvoices={totalInvoices}
            totalHours={totalHours}
            totalAmount={totalAmount}
          />
        }
      />

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`Delete Invoice ${selectedInvoice?.id}`}
        content="Are you sure you want to delete this invoice?"
        onSubmit={() => deleteInvoiceMutation(selectedInvoice?.id)}
      />
    </Box>
  )
}

export default InvoiceIndex
