import { Box, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfileForm, { Inputs } from '@/components/Form/ProfileForm'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useEditUser, useUser } from '@/hooks/useUsers'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const EditUser = () => {
  const { userId } = useParams()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { user, isLoading } = useUser(parseInt(userId || ''))
  const { isEditing, isEdited, updateUserMutation } = useEditUser(
    parseInt(userId || '')
  )
  const form = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { ...rest } = data
    updateUserMutation(rest)
  }

  useEffect(() => {
    if (isEdited) {
      enqueueSnackbar('User Edited!', { variant: 'success' })
      navigate('/admin/users')
    }
  }, [isEdited, enqueueSnackbar, navigate])

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
      <Title>Edit user</Title>

      <ProfileForm
        form={form}
        onSubmit={onSubmit}
        submitButtonDisabled={isEditing}
        initialValues={user}
      />
    </Box>
  )
}

export default EditUser
