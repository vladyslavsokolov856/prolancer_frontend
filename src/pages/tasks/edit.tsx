import { Box, CircularProgress } from '@mui/material'
import TaskForm from '@/components/Form/TaskForm'
import { styled } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '@/components/Form/TaskForm'
import { useTask, useEditTask } from '@/hooks/useTasks'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const EditTask = () => {
  let { taskId } = useParams()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const form = useForm<Inputs>()
  const { task, isLoading } = useTask(parseInt(taskId || ''))
  const { isEditing, isEdited, updateTaskMutation } = useEditTask(
    parseInt(taskId || '')
  )

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updateTaskMutation({
      ...data,
      start_date: data.start_date ? data.start_date.toDate() : null,
      end_date: data.end_date ? data.end_date.toDate() : null,
    })
  }

  useEffect(() => {
    if (isEdited) {
      enqueueSnackbar('Task Edited!', { variant: 'success' })
      navigate('/tasks')
    }
  }, [isEdited])

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
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Edit task</Title>

      <TaskForm
        form={form}
        onSubmit={onSubmit}
        submitButtonDisabled={isEditing}
        type="Update"
        initialValues={task}
      />
    </Box>
  )
}

export default EditTask
