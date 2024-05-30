import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfileForm, { Inputs } from '@/components/Form/ProfileForm'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useCreateUser } from '@/hooks/useUsers'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const CreateUser = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const form = useForm<Inputs>()
  const { isCreating, isCreated, createUserMutation } = useCreateUser()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email_preferences, ...rest } = data
    createUserMutation({ ...rest, role: 'user' })
  }

  useEffect(() => {
    if (isCreated) {
      enqueueSnackbar('User Created!', { variant: 'success' })
      navigate('/admin/users')
    }
  }, [isCreated])

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Create task</Title>

      <ProfileForm
        form={form}
        onSubmit={onSubmit}
        submitButtonDisabled={isCreating}
      />
    </Box>
  )
}

export default CreateUser
