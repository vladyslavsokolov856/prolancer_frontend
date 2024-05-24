import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import { Link } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useUsers, useDeleteUser } from '@/hooks/useUsers'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ProTable, { ColumnType } from '@/components/ProTable'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmDialog from '@/components/ConfirmDialog'
import User from '@/types/users'

type SelectedUserType = User | null | undefined

const InvoiceIndex = () => {
  const { users } = useUsers()
  const { deleteUserMutation } = useDeleteUser()

  const [open, setOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<SelectedUserType>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedUser(users.find((item) => item.id === id))
    setOpen(true)
  }

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: 'display_name',
        name: 'Name',
        render: (value, record) => `${record.first_name} ${record.last_name}`,
      },
      { key: 'email', name: 'Email' },
      { key: 'phone_number', name: 'Phone' },
      {
        key: 'role',
        name: 'Role',
        render: (role) => (
          <Chip
            label={role}
            color="primary"
            sx={{ borderRadius: '2px' }}
            size="small"
          />
        ),
      },
      {
        key: 'id',
        align: 'right',
        render: (value) => (
          <Box display="flex" justifyContent="flex-end" sx={{ gap: '10px' }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              component={RouterLink}
              to={`/admin/users/${value}/edit`}
              color="secondary"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              size="small"
              onClick={() => handleDeleteClick(value)}
              color="error"
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    [handleDeleteClick]
  )

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
        >
          here
        </Link>
      </Alert>

      <ProTable columns={columns} data={users} />

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`Delete ${selectedUser?.first_name} ${selectedUser?.last_name}`}
        content="Are you sure you want to delete this user?"
        onSubmit={() => deleteUserMutation(selectedUser?.id)}
      />
    </Box>
  )
}

export default InvoiceIndex
