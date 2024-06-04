import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Divider,
  MenuItem,
} from '@mui/material'
import { IListItem } from '.'
import AddIcon from '@mui/icons-material/Add'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTasks } from '@/hooks/useTasks'
import { useCreateWorkLog } from '@/hooks/useWorkLogs'
import { useSnackbar } from 'notistack'

interface ICreateTimeRegistration {
  open: boolean
  onClose(): void
  setListItems: Dispatch<SetStateAction<IListItem[]>>
}

const CreateTimeRegistration: React.FC<ICreateTimeRegistration> = ({
  open,
  onClose,
  setListItems,
}) => {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
  const [duration, setDuration] = useState(0)
  const [task, setTask] = useState<number | undefined | null | ''>('')
  const [notes, setNotes] = useState<string>('')
  const { createWorkLogMutation, createdWorkLog, isCreated } =
    useCreateWorkLog()
  const { enqueueSnackbar } = useSnackbar()

  const { tasks } = useTasks()

  const handleChange = (cb: any) => (e: any) => {
    cb(e.target.value)
  }

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setStartTime(date)
  }

  const handleSaveDraft = () => {
    if (startTime && duration) {
      const newItem = {
        start_time: dayjs(startTime).format('M/D/YYYY, h:mm:ss A'),
        duration_minutes: duration,
        task_id: tasks.find(({ id }) => id === parseInt(task as string))?.id,
        notes,
        status: 'draft',
      }

      createWorkLogMutation(newItem)
    }
  }

  useEffect(() => {
    if (isCreated && createdWorkLog) {
      enqueueSnackbar('Time registration created!', { variant: 'success' })
      setListItems((prevItems) => {
        return [createdWorkLog, ...prevItems]
      })
      onClose()
    }
  }, [isCreated])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ padding: '1rem' }}
      maxWidth="lg"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: 700, fontSize: '2.25rem', color: '#6c757d' }}
      >
        Add time registration
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ padding: '1.5rem' }}>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item md={9}>
                <FormControl fullWidth>
                  <InputLabel>Task</InputLabel>
                  <Select
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
              <Grid item md={3}>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Create task
                </Button>
              </Grid>
              <Grid item md={6}>
                <DateTimePicker
                  sx={{ width: '100%' }}
                  value={startTime}
                  onChange={handleDateChange}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Duration (minutes) *"
                  type="number"
                  value={duration}
                  onChange={handleChange(setDuration)}
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Notes"
                  value={notes}
                  onChange={handleChange(setNotes)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveDraft} autoFocus variant="contained">
          Save draft
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTimeRegistration
