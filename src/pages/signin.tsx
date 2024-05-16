import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
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
import { Icon } from '@iconify/react'

const SignIn = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState<boolean>(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be over 8 letters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Password must contain Uppercase, Lowercase, Number')
  })

  // Todo: REMOVE Below DUMMY ACTION
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true)

      await delay(3000)
      console.log(values)
      setSubmitting(false)
      resetForm()
      setErrors({ email: '', password: '' })
      navigate('/')
    }
  })

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik


  return (
    <Box className="h-screen justify-center items-center flex">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <Box
            sx={{ width: 400 }}>
            <Stack spacing={2}>
              <Stack>
                <Typography
                  pl={5}
                  fontWeight={600}
                  component="h2"
                  variant="h5">
                  Log In
                </Typography>
              </Stack>
              <TextField
                autoComplete="email"
                label="Email address"
                {...getFieldProps('email')}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error">
                    {touched.email && errors.email}
                  </Typography>
                }
              />
              <TextField
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
                {...getFieldProps('password')}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error">
                    {touched.password && errors.password}
                  </Typography>
                }
              />

              <Box>
                <Typography variant="body2">
                  <Link
                    className="text-blue-900"
                    to="/">
                    <b>Forget Password?</b>
                  </Link>
                </Typography>
              </Box>

              <Button
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={18} color="info" /> : undefined}
                disableElevation
                size="large"
                variant="contained">
                Sign In
              </Button>
              <Typography
                variant="body2">
                Don&apos;t have an account?{' '}
                <Link
                  className="text-blue-900"
                  to="/signup">
                  <b>Sign up</b>
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
        </Form>
      </FormikProvider>
    </Box>
  )
}

export default SignIn