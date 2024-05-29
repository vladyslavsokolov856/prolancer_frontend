import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { DateTimePicker } from '@mui/x-date-pickers'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import TimeIcon from '@mui/icons-material/AccessTime'
import { IListItem } from '@/pages/time'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useTasks } from '@/hooks/useTasks'
import { useDeleteWorkLog, useEditWorkLog } from '@/hooks/useWorkLogs'
import { useSnackbar } from 'notistack'

dayjs.extend(customParseFormat)

const format = 'M/D/YYYY, hh:mm:ss A'

interface IProListItem {
  item: IListItem
  setItems: Dispatch<SetStateAction<IListItem[]>>
}

const ProListItem: React.FC<IProListItem> = ({ item, setItems }) => {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
  const [duration, setDuration] = useState(0)
  const [task, setTask] = useState<number | undefined | null>(null)
  const [notes, setNotes] = useState<string>('')

  const { tasks } = useTasks()
  const { updateWorkLogMutation, isEdited, isEditing } = useEditWorkLog()
  const { deleteWorkLogMutation } = useDeleteWorkLog()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setStartTime(dayjs(item.start_time))
    setDuration(item.duration_minutes)
    setTask(item.task_id)
    setNotes(item.notes)
  }, [item])

  useEffect(() => {
    if (isEdited) {
      enqueueSnackbar('Time registration updated!', { variant: 'success' })
    }
  }, [isEdited])

  const handleChange = (cb: any) => (e: any) => {
    cb(e.target.value)
  }

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setStartTime(date)
  }

  const handleEditClick = (selectedId: number) => () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        selectedId === item.id ? { ...item, editable: true } : item
      )
    )
  }

  const handleDelete = (selectedId: number) => () => {
    deleteWorkLogMutation(selectedId)
    enqueueSnackbar('Time registration deleted!', { variant: 'success' })
    setItems((prevItems) => prevItems.filter(({ id }) => selectedId !== id))
  }

  const handleCancel = (selectedId: number) => () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        selectedId === item.id ? { ...item, editable: false } : item
      )
    )
  }

  const handleSaveDraft = (selectedId: number) => () => {
    if (duration && startTime && notes && task) {
      const { editable, ...rest } = item
      updateWorkLogMutation({
        id: selectedId,
        workLogData: {
          ...rest,
          duration_minutes: duration,
          start_time: dayjs(startTime).format('M/D/YYYY, h:mm:ss A'),
          notes,
          task_id: task,
          status: 'draft',
        },
      })

      setItems((prevItems) =>
        prevItems.map((item) =>
          selectedId === item.id
            ? {
                ...item,
                duration_minutes: duration,
                start_time: dayjs(startTime).format('M/D/YYYY, h:mm:ss A'),
                notes,
                task_id: task,
                editable: false,
              }
            : item
        )
      )
    }
  }

  const handleSendToCustomer = (selectedId: number) => () => {
    if (duration && startTime && notes && task) {
      const { editable, ...rest } = item
      updateWorkLogMutation({
        id: selectedId,
        workLogData: {
          ...rest,
          duration_minutes: duration,
          start_time: dayjs(startTime).format('M/D/YYYY, h:mm:ss A'),
          notes,
          task_id: task,
          status: 'sent',
        },
      })
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        padding: '20px',
        marginY: '20px',
      }}
      key={item.id}
    >
      {!item.editable ? (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>{dayjs(item.start_time).format(format)}</Typography>
          <Typography>
            <TimeIcon /> {item.duration_minutes + ' min'}
          </Typography>
          <Typography>
            {item.task_id
              ? tasks.find(({ id: taskId }) => taskId === item.task_id)?.title
              : 'No task selected'}
          </Typography>
          <Typography>{item.notes}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box
              sx={{
                backgroundColor: '#0142c2',
                borderRadius: '5px',
                width: '40px',
                height: '25px',
                fontSize: '12px',
                fontWeight: '600',
                padding: '0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              draft
            </Box>
            <Button
              variant="contained"
              sx={{ minWidth: '20px', width: '40px', height: '35px' }}
              onClick={handleEditClick(item.id)}
            >
              <EditIcon sx={{ width: '15px' }} />
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ minWidth: '20px', width: '40px', height: '35px' }}
              onClick={handleDelete(item.id)}
            >
              <DeleteIcon sx={{ width: '15px' }} />
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <form>
            <Grid container>
              <Grid item md={3} sx={{ paddingX: '10px' }}>
                <DateTimePicker
                  label="Start time *"
                  value={startTime}
                  onChange={handleDateChange}
                  sx={{ width: '100%', backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item md={3} sx={{ paddingX: '10px' }}>
                <TextField
                  label="Duration (minutes)"
                  type="number"
                  value={duration}
                  onChange={handleChange(setDuration)}
                  fullWidth
                />
              </Grid>
              <Grid item md={3} sx={{ paddingX: '10px' }}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Task *</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    label="Country"
                    value={task}
                    onChange={handleChange(setTask)}
                    fullWidth
                  >
                    {tasks.map(({ id, title }) => (
                      <MenuItem key={id} value={id}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} sx={{ paddingX: '10px' }}>
                <TextField
                  label="Notes *"
                  value={notes}
                  onChange={handleChange(setNotes)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
          <Box
            gap={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '16px',
              paddingX: '10px',
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#6c757d',
                ':hover': { backgroundColor: '#5c636a' },
              }}
              onClick={handleCancel(item.id)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleSaveDraft(item.id)}
              disabled={isEditing}
            >
              Save draft
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<EmailIcon />}
              onClick={handleSendToCustomer(item.id)}
            >
              Send to customer
            </Button>
          </Box>
        </>
      )}
    </Paper>
  )
}

export default ProListItem
