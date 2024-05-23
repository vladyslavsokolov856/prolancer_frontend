import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { Inputs } from '@/components/Form/ProfileForm'
import ProfileForm from '@/components/Form/ProfileForm'

const ProfileSettings = () => {
  const form = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async () => {
    form.reset()
  }

  return (
    <Box>
      <Typography variant="h4">ProfileSettings</Typography>

      <ProfileForm form={form} onSubmit={onSubmit} />
    </Box>
  )
}

export default ProfileSettings
