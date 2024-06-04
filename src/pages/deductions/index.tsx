import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ProTable, { ColumnType } from '@/components/ProTable'
import { Link as RouterLink } from 'react-router-dom'
import dayjs from 'dayjs'
import { useDeductions, useDeleteDeduction } from '@/hooks/useDeductions'
import { useMemo, useState } from 'react'
import ConfirmDialog from '@/components/ConfirmDialog'
import Deduction from '@/types/deductions'

type SelectedDeductionType = Deduction | null | undefined

const deductionStatus = [
  { key: 'approved', name: 'Approved' },
  { key: 'declined', name: 'Declined' },
  { key: 'deleted_by_user', name: 'Deleted by User' },
  { key: 'draft', name: 'Draft' },
  { key: 'sent', name: 'Sent' },
  { key: '', name: 'None' },
]

const DeductionIndex = () => {
  const { isLoading, deductions } = useDeductions()
  const [open, setOpen] = useState<boolean>(false)
  const { deleteDeductionMutation } = useDeleteDeduction()
  const [selectedDeduction, setSelectedDeduction] =
    useState<SelectedDeductionType>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedDeduction(deductions?.find((item) => item.id === id))
    setOpen(true)
  }

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: 'description',
        name: 'Name',
        render: (value) => {
          return (
            <Box>
              <Box display="flex" gap="5px">
                <Chip
                  label={value ? value.slice(0, 2) : ''}
                  size="small"
                  sx={{
                    borderRadius: '0.25rem',
                    minWidth: '40px',
                    height: '22px',
                    color: 'white',
                    backgroundColor: 'rgb(213, 214, 217) !important',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                />
                <span style={{ fontSize: '15px', fontWeight: 700 }}>
                  {value}
                </span>
              </Box>
            </Box>
          )
        },
      },
      {
        key: 'status',
        name: 'Status',
        render: (value) => (
          <Chip
            label={value}
            color="primary"
            size="small"
            sx={{ borderRadius: '2px' }}
          />
        ),
      },
      {
        key: 'amount',
        name: 'Total',
        render: (value, record) => (
          <Box>
            {record.currency}{' '}
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Box>
        ),
      },
      {
        key: 'start_date',
        name: 'Created date',
        render: (value) => dayjs(value).format('M/DD/YYYY'),
      },
      {
        key: 'id',
        name: '',
        render: (value) => (
          <Box display="flex" justifyContent="flex-end" sx={{ gap: '10px' }}>
            <Button
              variant="contained"
              size="small"
              component={RouterLink}
              to={`/deductions/${value}/edit`}
              color="secondary"
              sx={{ minWidth: '40px' }}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDeleteClick(value)}
              color="error"
              sx={{ minWidth: '40px' }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        ),
      },
    ],
    [handleDeleteClick]
  )

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
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Deductions</Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
          component={RouterLink}
          to="/deductions/new"
        >
          Create Deduction
        </Button>
      </Box>

      <ProTable
        columns={columns}
        data={deductions}
        filters={[
          {
            key: 'status',
            name: 'Status',
            items: deductionStatus,
          },
        ]}
      />

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`Delete Deduction ${selectedDeduction?.id}`}
        content="Are you sure you want to delete this deduction?"
        onSubmit={() => deleteDeductionMutation(selectedDeduction?.id)}
      />
    </Box>
  )
}

export default DeductionIndex
