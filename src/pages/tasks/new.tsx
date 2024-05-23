import { Box } from '@mui/material'
import TaskForm from '@/components/Form/TaskForm'
import { styled } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '@/components/Form/TaskForm'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const CreateTask = () => {
  const form = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    form.reset()
  }

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Create task</Title>

      <TaskForm form={form} onSubmit={onSubmit} />
    </Box>
  )
}

export default CreateTask
