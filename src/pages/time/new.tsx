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
} from '@mui/material'
import { IListItem, mockTaskData, mockTaskOptions } from '.'
import AddIcon from '@mui/icons-material/Add'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useState } from 'react'

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

  const handleChange = (cb: any) => (e: any) => {
    cb(e.target.value)
  }

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setStartTime(date)
  }

  const handleSaveDraft = () => {
    if (startTime && duration) {
      setListItems((prevItems) => {
        const newItem: IListItem = {
          id: prevItems.length + 1,
          start_time: dayjs(startTime).format('M/D/YYYY, h:mm:ss A'),
          duration,
          task_id: mockTaskData.find(
            ({ id }) => id === parseInt(task as string)
          )?.id,
          notes,
        }

        return [newItem, ...prevItems]
      })
      onClose()
    }
  }

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
                    {mockTaskOptions}
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
