import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AddIcon from '@mui/icons-material/Add'
import PlayIcon from '@mui/icons-material/PlayArrowOutlined'
import StopIcon from '@mui/icons-material/StopOutlined'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ProFilter, { IFilter } from '@/components/ProFilter'
import ProList from '@/components/ProList'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import CreateTimeRegistration from './new'

const filters: IFilter[] = [
  {
    name: 'Task',
    type: 'select',
    key: 'task_id',
    items: [
      { key: 1, name: 'Task1' },
      { key: 2, name: 'Task2' },
    ],
    columnSize: 3,
  },
  {
    name: 'Date',
    type: 'date',
    key: 'start_time',
    columnSize: 3,
  },
]

export interface IListItem {
  id: number
  start_time: string
  duration: number
  task_id?: number
  notes: string
  editable?: boolean
}

type IListItemKey = keyof IListItem

export interface ISortItem {
  name: string
  field: IListItemKey
}

const sortItems: ISortItem[] = [
  { name: 'Duration (minutes)', field: 'duration' },
  { name: 'Task', field: 'task_id' },
  { name: 'Start time', field: 'start_time' },
  { name: 'Notes', field: 'notes' },
]

const searchFields: IListItemKey[] = ['notes']

const mockListItems: IListItem[] = [
  {
    id: 1,
    start_time: '5/22/2024, 8:15:33 PM',
    duration: 1,
    task_id: 1,
    notes: 'note1',
  },
  {
    id: 2,
    start_time: '5/21/2024, 11:24:25 AM',
    duration: 5,
    task_id: 2,
    notes: 'note2',
  },
]

export const mockTaskData = [
  { id: 1, name: 'task1' },
  { id: 2, name: 'task2' },
]

export const mockTaskOptions = mockTaskData.map(({ id, name }) => (
  <MenuItem key={id} value={id}>
    {name}
  </MenuItem>
))

type Inputs = {
  notes: string
  task_id: string
}

const TimeRegistration = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [listItems, setListItems] = useState<IListItem[]>([])
  const [timer, setTimer] = useState(0)

  const { register, watch } = useForm<Inputs>()

  useEffect(() => {
    setListItems(mockListItems)
  }, [])

  useEffect(() => {
    let interval = undefined

    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1000)
      }, 1000)
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRecording, timer])

  const formatTime = (timer: number) => {
    const seconds = `0${Math.floor((timer / 1000) % 60)}`.slice(-2)
    const minutes = `0${Math.floor((timer / 60000) % 60)}`.slice(-2)
    const hours = `0${Math.floor(timer / 3600000)}`.slice(-2)
    return `${hours}:${minutes}:${seconds}`
  }

  const handleToggleRecordTime = () => {
    if (isRecording) {
      setTimer(0)
      setListItems((prevItems) => {
        const now = dayjs().format('M/D/YYYY, h:mm:ss A')
        const minutes = Math.floor((timer / 60000) % 60)
        const hours = Math.floor(timer / 3600000)

        const newItem: IListItem = {
          id: prevItems.length + 1,
          start_time: now,
          duration: hours * 60 + minutes + 1,
          task_id: mockTaskData.find(
            ({ id }) => id === parseInt(watch('task_id'))
          )?.id,
          notes: watch('notes'),
        }

        return [newItem, ...prevItems]
      })
    }
    setIsRecording((prevStatus) => !prevStatus)
  }

  const [addTimeRegistrationDialogOpen, setAddTimeRegistrationDialogOpen] =
    useState(false)

  const handleAddTimeRegistrationClick = () =>
    setAddTimeRegistrationDialogOpen(true)

  const closeAddTimeRegistrationDialogClose = () =>
    setAddTimeRegistrationDialogOpen(false)

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Time registration</Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '35px' }}
          onClick={handleAddTimeRegistrationClick}
        >
          Add time registration
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
        Track your work, download your timesheet or send your client an update
        on your hours directly.
      </Alert>

      <Paper
        sx={{
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Grid container alignItems={'center'}>
          <Grid item md={1} display="flex" alignItems="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: !isRecording ? '#0acf97' : '#d54e69',
                minWidth: '20px',
                width: '45px',
                ':hover': {
                  backgroundColor: !isRecording ? '#09b988' : '#d54e69',
                },
              }}
              onClick={handleToggleRecordTime}
            >
              {!isRecording ? <PlayIcon /> : <StopIcon />}
            </Button>
          </Grid>
          <Grid item md={2} display="flex" alignItems="center">
            <Typography
              sx={{ fontWeight: 700, fontSize: '1.875rem', color: '#6c757d' }}
            >
              {formatTime(timer)}
            </Typography>
          </Grid>
          <Grid item md={9}>
            <Grid container display="flex" alignItems="flex-start">
              <Grid item md={6} sx={{ paddingX: '5px' }}>
                <TextField
                  label="Notes"
                  sx={{ height: '20px' }}
                  {...register('notes')}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={3} sx={{ paddingX: '5px' }}>
                <FormControl fullWidth>
                  <InputLabel size="small" sx={{ bgcolor: 'white' }}>
                    Task
                  </InputLabel>
                  <Select
                    defaultValue=""
                    size="small"
                    {...register('task_id')}
                    fullWidth
                  >
                    {mockTaskOptions}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                md={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingx: '5px',
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ height: '35px' }}
                  fullWidth
                >
                  Create task
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <ProFilter
        filters={filters}
        setItems={setListItems}
        searchFields={searchFields}
        originalListItems={mockListItems}
        sortItems={sortItems}
      />
      <ProList items={listItems} setItems={setListItems} />

      {addTimeRegistrationDialogOpen && (
        <CreateTimeRegistration
          open={true}
          onClose={closeAddTimeRegistrationDialogClose}
          setListItems={setListItems}
        />
      )}
    </Box>
  )
}

export default TimeRegistration
