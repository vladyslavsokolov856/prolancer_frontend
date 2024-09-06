import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { Inputs } from '@/components/Form/ProfileForm'
import ProfileForm from '@/components/Form/ProfileForm'
import { useCurrentUser } from '@/hooks/useUsers'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const ProfileSettings = () => {
  const form = useForm<Inputs>()
  const { user, isLoading } = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()

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

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    console.log('userData', userData)
    axios.put(`/api/users/${user?.id}`, userData).then(() => {
      enqueueSnackbar('Successfully Updated!', { variant: 'success' })
    })
  }

  return (
    <Box>
      <Typography variant="h4">ProfileSettings</Typography>

      <ProfileForm form={form} onSubmit={onSubmit} initialValues={user} />
    </Box>
  )
}

export default ProfileSettings
