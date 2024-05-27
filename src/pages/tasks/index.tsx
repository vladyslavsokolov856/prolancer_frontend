import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ProTable, { ColumnType } from '@/components/ProTable'
import { Link as RouterLink } from 'react-router-dom'
import dayjs from 'dayjs'
import { Menu, MenuItem } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTasks } from '@/hooks/useTasks'
import { useCustomers } from '@/hooks/userCustomers'

const TaskIndex = () => {
  const { isLoading: isTaskLoading, tasks } = useTasks()
  const { isLoading: isCustomerLoading, customers } = useCustomers()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const columns: ColumnType[] = useMemo(
    () => [
      {
        key: 'title',
        name: 'Name',
        render: (value, record) => {
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
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{ gap: '10px' }}
                >
                  <b style={{ fontSize: '15px' }}>{value}</b>
                  <span>{record.reference}</span>
                </Box>
              </Box>
            </Box>
          )
        },
      },
      {
        key: 'customer_name',
        name: 'Customer',
      },
      {
        key: 'is_retainer',
        name: 'Retainer',
        render: (value, record) => (
          <Box>
            {!!value ? (
              <Box
                display="flex"
                alignItems="center"
                sx={{ fontSize: '14.4px', color: '#6c757d', gap: '10px' }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: 'green', width: '20px', height: '20px' }}
                />
                {`${record.minutes_spent} mins / ${
                  record.expected_minutes / 60.0
                } hrs`}
              </Box>
            ) : (
              <HighlightOffIcon
                sx={{ color: 'red', width: '20px', height: '20px' }}
              />
            )}
          </Box>
        ),
      },
      {
        key: 'status',
        name: 'Status',
        render: (value) => <Chip label={value} color="primary" />,
      },
      {
        key: 'start_date',
        name: 'Start date',
        render: (value) => dayjs(value).format('M/DD/YYYY'),
      },
      {
        key: 'end_date',
        name: 'End date',
        render: (value) => dayjs(value).format('M/DD/YYYY'),
      },
      {
        key: 'action',
        name: '',
        render: () => (
          <div>
            <Button
              id="action-button"
              aria-controls={open ? 'action-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant="outlined"
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'action-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Box display="flex" alignItems="center" sx={{ gap: '10px' }}>
                  <TextSnippetOutlinedIcon />
                  Download time registration
                </Box>
              </MenuItem>
            </Menu>
          </div>
        ),
      },
    ],
    [open, anchorEl, handleClick, handleClose]
  )

  const taskData = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        customer_name: customers.find(
          (customer) => customer.id === task.customer_id
        )?.name_contact_person,
      })),
    [isCustomerLoading, isTaskLoading]
  )

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Tasks </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
          component={RouterLink}
          to="/tasks/new"
        >
          Create Task
        </Button>
      </Box>

      <ProTable columns={columns} data={taskData || []} />
    </Box>
  )
}

export default TaskIndex
