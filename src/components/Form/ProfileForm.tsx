import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
import { countries } from 'countries-list'
import { useJobTypes } from '@/hooks/useJobTypes'
import User from '@/types/users'
import { useEffect, useMemo } from 'react'
import { CircularProgress } from '@mui/material'
import ProInput from '../ProInput'
import ProSelect from '../ProSelect'
import ProRadioGroup from '../ProRadioGroup'

export type Inputs = {
  job_type_id: string
  user_language: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  city: string
  postal_code: string
  country: string
  email_preferences?: string
  bank_information: {
    name: string
    registration_number: string
    account_number: string
  }
  tax_person_id: string
  tax_card: string
  salary_payment_type_requested: string
  holiday_payment: boolean
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
}))

interface SectionHeaderProps {
  title: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Box
      style={{
        backgroundColor: '#0142c2',
        color: 'white',
        fontWeight: 700,
        fontSize: '1.125rem',
        margin: '10px 0',
        padding: '.375rem',
      }}
    >
      {title}
    </Box>
  )
}

interface UserFormProps {
  form: UseFormReturn<Inputs, any, any>
  onSubmit: SubmitHandler<Inputs>
  submitButtonDisabled?: boolean
  initialValues?: User | null
}

const ProfileForm: React.FC<UserFormProps> = ({
  form,
  onSubmit,
  submitButtonDisabled = false,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form

  const { data: jobTypes } = useJobTypes()
  const formLoaded = useMemo(() => {
    return jobTypes
  }, [jobTypes])
  const email = watch('email')

  useEffect(() => {
    reset(initialValues || undefined)
  }, [initialValues])

  if (!formLoaded) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledPaper>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <SectionHeader title="Settings" />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProSelect
              labelId="job-type-label"
              id="job_type_id"
              label="Job Type"
              defaultValue={initialValues?.job_type_id || ''}
              {...register('job_type_id', {
                required: 'Job Type is a required field',
              })}
              required
              fullWidth
              error={!!errors.job_type_id}
            >
              {jobTypes?.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </ProSelect>
          </Grid>
          <Grid item md={6} xs={12}>
            <ProSelect
              labelId="language-label"
              id="user_language"
              label="Language"
              defaultValue={initialValues?.user_language || ''}
              {...register('user_language', {
                required: 'Language is a required field',
              })}
              required
              fullWidth
              error={!!errors.user_language}
            >
              <MenuItem value="danish">Danish</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </ProSelect>
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Contact" />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="First name"
              style={{ margin: '1px' }}
              {...register('first_name', {
                required: 'First name is a required field',
              })}
              required
              error={!!errors.first_name}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.first_name && (errors.first_name?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Last name"
              style={{ margin: '1px' }}
              {...register('last_name', {
                required: 'Last name is a required field',
              })}
              required
              error={!!errors.last_name}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.last_name && (errors.last_name?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Email"
              style={{ margin: '1px' }}
              {...register('email', {
                required: 'Email is a required field',
              })}
              required
              error={!!errors.email}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.email && (errors.email?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Phone number"
              style={{ margin: '1px' }}
              {...register('phone_number', {
                required: 'Phone number is a required field',
              })}
              required
              error={!!errors.phone_number}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.phone_number && (errors.phone_number?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Address information" />
          </Grid>
          <Grid item xs={12}>
            <ProInput
              label="Address"
              style={{ margin: '1px' }}
              {...register('address', {
                required: 'Address is a required field',
              })}
              required
              error={!!errors.address}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.address && (errors.address?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="City"
              style={{ margin: '1px' }}
              {...register('city', {
                required: 'City is a required field',
              })}
              required
              error={!!errors.city}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.city && (errors.city?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Postal code"
              style={{ margin: '1px' }}
              {...register('postal_code', {
                required: 'Postal code is a required field',
              })}
              required
              error={!!errors.postal_code}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.postal_code && (errors.postal_code?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProSelect
              labelId="country-select-label"
              id="country"
              label="Country"
              defaultValue={initialValues?.country || ''}
              {...register('country', {
                required: 'Country is a required field',
              })}
              required
              fullWidth
              error={!!errors.country}
            >
              {Object.entries(countries).map(([countryCode, countryData]) => (
                <MenuItem key={countryCode} value={countryCode}>
                  {countryData.name}
                </MenuItem>
              ))}
            </ProSelect>
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Email preferences" />
          </Grid>
          <Grid item xs={12}>
            <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
              Personalise how you receive emails with your activity. All
              notifications are sent to <b>{email}</b>.
            </p>
            <ProRadioGroup
              {...register('email_preferences')}
              options={[
                {
                  value: 'instantly',
                  label: 'Instantly',
                  description: 'For Every action in your account',
                },
                {
                  value: 'daily',
                  label: 'Daily',
                  description: 'Sends a summary every day at 5pm',
                },
                {
                  value: 'weekly',
                  label: 'Weekly',
                  description: 'Sends a summary every friday at 5pm',
                },
              ]}
            />

            <p
              style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                marginBottom: '16px',
                marginTop: '8px',
              }}
            >
              <b>NOTE</b>: You'll always get <b>instant</b> notifications for
              successful transactions, requests for additional information, and
              revisions needed.
            </p>
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Payment details" />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Bank name"
              style={{ margin: '1px' }}
              {...register('bank_information.name', {
                required: 'Bank name is a required field',
              })}
              required
              error={!!errors.bank_information?.name}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.bank_information?.name &&
                    (errors.bank_information?.name?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Bank registration number"
              style={{ margin: '1px' }}
              {...register('bank_information.registration_number', {
                required: 'Bank registration number is a required field',
              })}
              required
              error={!!errors.bank_information?.registration_number}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.bank_information?.registration_number &&
                    (errors.bank_information?.registration_number?.message ||
                      '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="Bank account number"
              style={{ margin: '1px' }}
              {...register('bank_information.account_number', {
                required: 'Bank account number is a required field',
              })}
              required
              error={!!errors.bank_information?.account_number}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.bank_information?.account_number &&
                    (errors.bank_information?.account_number?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Tax information" />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProInput
              label="CPR"
              style={{ margin: '1px' }}
              {...register('tax_person_id', {
                required: 'CPR is a required field',
              })}
              required
              error={!!errors.tax_person_id}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.tax_person_id &&
                    (errors.tax_person_id?.message || '')}
                </Typography>
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ProSelect
              labelId="tax-card-label"
              id="tax_card"
              label="Tax card"
              defaultValue={initialValues?.tax_card || ''}
              {...register('tax_card', {
                required: 'Tax card is a required field',
              })}
              required
              fullWidth
            >
              <MenuItem value="main">Main Tax Card</MenuItem>
              <MenuItem value="secondary">Secondary Tax Card</MenuItem>
            </ProSelect>
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Salary information" />
          </Grid>
          <Grid item xs={12}>
            <Alert
              icon={false}
              sx={{
                backgroundColor: 'rgb(242, 246, 253)',
                borderRadius: '4px',
                border: '1px solid rgb(234, 236, 239)',
                marginBottom: '16px',
                padding: '12px 20px',
                fontSize: '0.9rem',
                color: 'rgb(93, 100, 114)',
                lineHeight: '21.6px',
                fontWeight: 400,
                '& .MuiAlert-message': {
                  padding: 0,
                },
              }}
            >
              You will currently receive your salary payment when the client
              pays the invoice. If you wish to change this, set the payment type
              below. This will take affect from the next salary payment.
            </Alert>
          </Grid>
          <Grid item md={6} xs={12}>
            <ProSelect
              labelId="requested-salary-payment-label"
              id="salary_payment_type_requested"
              label="Requested salary payment type"
              defaultValue={initialValues?.salary_payment_type_requested || ''}
              {...register('salary_payment_type_requested', {
                required: 'Requested salary payment type is a required field',
              })}
              required
              fullWidth
            >
              <MenuItem value="first">First of Month</MenuItem>
              <MenuItem value="last">Last of Month</MenuItem>
              <MenuItem value="none">None selected</MenuItem>
            </ProSelect>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <FormControl>
              <FormControlLabel
                // {...register('holiday_payment', {
                //   required: 'Holiday payment is a required field',
                // })}
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      '&.Mui-checked': {
                        color: '#0142c2',
                        opacity: '0.5',
                      },
                    }}
                  />
                }
                label="Add holiday payment"
                disabled
              />
            </FormControl>
            <div style={{ fontSize: '0.75rem', color: '#98a6ad' }}>
              Mandatory payment of 12,5% to your holiday account.
            </div>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
        <Button
          type="submit"
          variant="contained"
          disabled={submitButtonDisabled}
        >
          Save Changes
        </Button>
      </StyledPaper>
    </form>
  )
}

export default ProfileForm
