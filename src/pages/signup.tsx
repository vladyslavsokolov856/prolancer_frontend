import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {Icon} from "@iconify/react"
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>()

  // Todo: REMOVE Below DUMMY ACTION
  const delay = async (ms: number) => new Promise(res => setTimeout(res, ms))

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true)
    await delay(3000)
    console.log(data)
    setIsSubmitting(false)
    reset()
    navigate('/signin')
  }


  return (
    <Box className="h-screen justify-center items-center flex">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ width: 400 }}>
          <Stack spacing={2}>
            <Stack>
              <Typography
                pl={5}
                fontWeight={600}
                component="h2"
                variant="h5">
                Welcome!
              </Typography>
            </Stack>
            <TextField
              required
              autoComplete="email"
              label="Email address"
              {...register('email', { required: 'Email is required' })}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error">
                  {errors.email && (errors.email?.message || '')}
                </Typography>
              }
            />
            <TextField
              required
              type={show ? 'text' : 'password'}
              label="Password"
              autoComplete="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => {
                      setShow(!show)
                    }}>
                      {!show ? <Icon icon="bi:eye" /> : <Icon icon="bi:eye-slash" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...register('password', { required: 'Password is required' })}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error">
                  {errors.password && (errors.password?.message || '')}
                </Typography>
              }
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={18} color="info" /> : undefined}
              disableElevation
              size="large"
              variant="contained">
              Continue
            </Button>
            <Typography
              variant="body2">
              Already have an account?{' '}
              <Link
                className="text-blue-900"
                to="/signin">
                <b>Log in</b>
              </Link>

            </Typography>

            <Divider>OR</Divider>

            <Button
              startIcon={<Icon icon="flat-color-icons:google" />}
              size="large"
              variant="outlined">
              Continue with Google
            </Button>
            <Button
              startIcon={<Icon icon="devicon:linkedin" />}
              size="large"
              variant="outlined">
              Continue with LinkedIn
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  )
}

export default SignUp