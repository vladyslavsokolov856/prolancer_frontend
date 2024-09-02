import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import { useInvoices, useDeleteInvoice } from '@/hooks/useInvoices'
import { Link as RouterLink } from 'react-router-dom'
import React, { useCallback, useMemo, useState } from 'react'
import ProTable, { ColumnType } from '@/components/ProTable'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmDialog from '@/components/ConfirmDialog'
import Invoice from '@/types/invoices'
import InvoiceSummary from '@/components/Utils/InvoiceSummary'
import { useCustomers } from '@/hooks/useCustomers'
import { useOrderLines } from '@/hooks/useOrderLines'
import dayjs from 'dayjs'

type SelectedInvoiceType = Invoice | null | undefined

const statusColors: { [key: string]: any } = {
  cancelled: 'default',
  draft: 'secondary',
  sent: 'primary',
}

const statusFilter = {
  name: 'Status',
  type: 'select',
  key: 'status',
  items: [
    { key: 'approved_by_company', name: 'Approved by company' },
    { key: 'awaiting_task_approval', name: 'Awaiting task approval' },
    { key: 'cancelled', name: 'Cancelled' },
    { key: 'company_dispute', name: 'Company Dispute' },
    { key: 'debt_collection', name: 'Debt Collection' },
    { key: 'denied_by_company', name: 'Denied by Company' },
    { key: 'draft', name: 'Draft' },
    { key: 'late_payment', name: 'Late Payment' },
    { key: 'more_info_needed', name: 'More info needed' },
    { key: 'paid', name: 'Paid' },
    { key: 'payment_on_hold', name: 'Payment on hold' },
    { key: 'payment_received', name: 'Payment received' },
    { key: 'pending', name: 'Pending' },
    { key: 'salary_paid', name: 'Salary Paid' },
    {
      key: 'salary_paid_customer_not_paid',
      name: 'Salary paid - customer not paid',
    },
    { key: 'salary_paid_customer_paid', name: 'Salary paid - customer paid' },
    { key: 'sent', name: 'Sent' },
    { key: 'sent_to_company', name: 'Sent to Company' },
    {
      key: 'sent_to_company_awaiting_approval',
      name: 'Sent to company - Awaiting approval',
    },
    {
      key: 'sent_to_company_contract_made',
      name: 'Sent to company - contract made',
    },
    {
      key: 'sent_to_company_needs_contract',
      name: 'Sent to company - needs contract',
    },
    { key: 'none', name: 'None' },
  ],
}

interface InvoiceTableProps {
  taskId?: number
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ taskId }) => {
  const { invoices } = useInvoices()
  const { customers } = useCustomers()
  const { orderLines } = useOrderLines()
  const { deleteInvoiceMutation } = useDeleteInvoice()

  const [open, setOpen] = useState<boolean>(false)
  const [selectedInvoice, setSelectedInvoice] =
    useState<SelectedInvoiceType>(null)

  const handleDeleteClick = useCallback(
    (id: number) => {
      setSelectedInvoice(invoices.find((item) => item.id === id))
      setOpen(true)
    },
    [invoices]
  )

  const invoiceData = useMemo(() => {
    if (taskId) return invoices.filter((item) => item.task_id === taskId)
    else return invoices
  }, [invoices, taskId])

  const filters = useMemo(
    () => [
      {
        name: 'Customer',
        type: 'select',
        key: 'customer_id',
        items: customers.map((customer) => ({
          key: customer.id as number,
          name:
            customer &&
            (customer.type === 'private'
              ? customer.name_contact_person
              : customer.company_name),
        })),
      },
      {
        name: 'Invoice date',
        type: 'date',
        key: '_invoice_date',
      },
      {
        name: 'Invoice date before',
        type: 'date',
        key: '_invoice_date_before',

        filterFunction: (itemValue: string, filterValue: string) => {
          return dayjs(itemValue) < dayjs(filterValue)
        },
      },
      statusFilter,
    ],
    [customers]
  )

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: '_customer',
        name: 'Customer',
      },
      {
        key: 'amount',
        name: 'Amount',
        render: (amount, record) => {
          if (amount != null) {
            return `${record.currency} ${new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(amount)}`
          }
        },
      },
      {
        key: 'status',
        name: 'Status',
        render: (status: keyof typeof statusColors) => {
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
        render: (date) => dayjs(date).format('M/D/YYYY'),
      },
      {
        key: '_actions',
        align: 'right',
        render: (_, record) =>
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

  const formattedInvoices = invoiceData.map((invoice) => {
    const customer = customers.find(({ id }) => id == invoice.customer_id)
    const date = invoice.invoice_date
    const amount = orderLines.reduce((sum, lineItem) => {
      if (lineItem.invoice_id === invoice.id) {
        const qty = lineItem.quantity || 0
        const pricePerUnit = +lineItem.unit_price || 0
        sum += qty * pricePerUnit
      }
      return sum
    }, 0)
    const currency = invoice.currency || 'DKK'
    const invoiceDate = dayjs(date).format('M/D/YYYY')
    const newInvoice = {
      ...invoice,
      amount,
      currency,
      _amount: `${currency} ${new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)}`,
      _customer:
        customer &&
        (customer.type === 'private'
          ? customer.name_contact_person
          : customer.company_name),
      _invoice_date: invoiceDate,
      _invoice_date_before: invoiceDate,
    }
    return newInvoice
  })

  return (
    <>
      <ProTable
        columns={columns}
        data={formattedInvoices}
        filters={filters}
        BeforeTableComponent={InvoiceSummary}
        tableName="invoices"
      />
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`Delete Invoice ${selectedInvoice?.id}`}
        content="Are you sure you want to delete this invoice?"
        onSubmit={() => deleteInvoiceMutation(selectedInvoice?.id)}
      />
    </>
  )
}

const InvoiceIndex = () => {
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
        Here, you can manage your invoices. Create new invoices, view previously
        sent invoices and monitor their status
      </Alert>
      <InvoiceTable />
    </Box>
  )
}

export default InvoiceIndex
