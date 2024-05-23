import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Radio from '@mui/material/Radio'
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
  email_preferences: string
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

const StyledFormControlLabel = styled(FormControlLabel)<FormControlLabelProps>(
  () => ({
    width: '100%',
    border: '1px solid rgb(79, 153, 79)',
    color: '#6c757d',
    borderRadius: '3px',
    padding: '7px',
    cursor: 'pointer',
    margin: 0,
    '& .MuiSlider-thumb': {
      '&:hover, &.Mui-focusVisible': {},
      '&.Mui-active': {},
    },
    '&..MuiFormControlLabel-root': {
      backgroundColor: 'rgb(242, 255, 235)',
    },
  })
)

interface TaskFormProps {
  form: UseFormReturn<Inputs, any, any>
  onSubmit: SubmitHandler<Inputs>
}

const ProfileForm: React.FC<TaskFormProps> = ({ form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const { data: jobTypes } = useJobTypes()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledPaper>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <SectionHeader title="Settings" />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="job-type-label">Job Type</InputLabel>
              <Select
                labelId="job-type-label"
                id="job-type"
                label="Job Type"
                defaultValue=""
                {...register('job_type_id', {
                  required: 'Job Type is a required field',
                })}
                fullWidth
                error={!!errors.job_type_id}
              >
                {jobTypes?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {errors.job_type_id && (errors.job_type_id?.message || '')}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                label="Language"
                defaultValue=""
                {...register('user_language', {
                  required: 'Language is a required field',
                })}
                fullWidth
                error={!!errors.user_language}
              >
                <MenuItem value="danish">Danish</MenuItem>
                <MenuItem value="english">English</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText error>
              {errors.user_language && (errors.user_language?.message || '')}
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Contact" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="First name *"
              style={{ margin: '1px' }}
              {...register('first_name', {
                required: 'First name is a required field',
              })}
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
            <TextField
              label="Last name *"
              style={{ margin: '1px' }}
              {...register('last_name', {
                required: 'Last name is a required field',
              })}
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
            <TextField
              label="Email *"
              style={{ margin: '1px' }}
              {...register('email', {
                required: 'Email is a required field',
              })}
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
            <TextField
              label="Phone number *"
              style={{ margin: '1px' }}
              {...register('phone_number', {
                required: 'Phone number is a required field',
              })}
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
            <TextField
              label="Address *"
              style={{ margin: '1px' }}
              {...register('address', {
                required: 'Address is a required field',
              })}
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
            <TextField
              label="City *"
              style={{ margin: '1px' }}
              {...register('city', {
                required: 'City is a required field',
              })}
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
            <TextField
              label="Postal code *"
              style={{ margin: '1px' }}
              {...register('postal_code', {
                required: 'Postal code is a required field',
              })}
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
            <FormControl fullWidth>
              <InputLabel id="country-select-label">Country *</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                label="Country *"
                defaultValue=""
                {...register('country', {
                  required: 'Country is a required field',
                })}
                fullWidth
                error={!!errors.country}
              >
                {Object.entries(countries).map(([countryCode, countryData]) => (
                  <MenuItem key={countryCode} value={countryCode}>
                    {countryData.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {errors.country && (errors.country?.message || '')}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <SectionHeader title="Email preferences" />
          </Grid>
          <Grid item xs={12}>
            <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
              Personalise how you receive emails with your activity. All
              notifications are sent to <b>guesmiaabdelmadjid6@gmail.com</b>.
            </p>
            <FormControl
              sx={{ width: '100%', marginTop: '20px', marginBottom: '6px' }}
            >
              <RadioGroup
                row
                defaultValue="instantly"
                aria-labelledby="customer-type-radio-group-label"
                {...register('email_preferences', {
                  required: 'Customer type is a required field',
                })}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} md={4}>
                    <StyledFormControlLabel
                      value="instantly"
                      control={<Radio />}
                      label={
                        <>
                          <span>Instantly</span>
                          <br />
                          <span
                            style={{
                              color: 'rgb(195, 195, 195)',
                              fontSize: '0.8rem',
                            }}
                          >
                            For Every action in your account
                          </span>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <StyledFormControlLabel
                      value="daily"
                      control={<Radio />}
                      label={
                        <>
                          <span>Daily</span>
                          <br />
                          <span
                            style={{
                              color: 'rgb(195, 195, 195)',
                              fontSize: '0.8rem',
                            }}
                          >
                            Sends a summary every day at 5pm
                          </span>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <StyledFormControlLabel
                      value="weekly"
                      control={<Radio />}
                      label={
                        <>
                          <span>Weekly</span>
                          <br />
                          <span
                            style={{
                              color: 'rgb(195, 195, 195)',
                              fontSize: '0.8rem',
                            }}
                          >
                            Sends a summary every friday at 5pm
                          </span>
                        </>
                      }
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
            <p
              style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                marginBottom: '16px',
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
            <TextField
              label="Bank name *"
              style={{ margin: '1px' }}
              {...register('bank_information.name', {
                required: 'Bank name is a required field',
              })}
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
            <TextField
              label="Bank registration number *"
              style={{ margin: '1px' }}
              {...register('bank_information.registration_number', {
                required: 'Bank registration number is a required field',
              })}
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
            <TextField
              label="Bank account number *"
              style={{ margin: '1px' }}
              {...register('bank_information.account_number', {
                required: 'Bank account number is a required field',
              })}
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
            <TextField
              label="CPR *"
              style={{ margin: '1px' }}
              {...register('tax_person_id', {
                required: 'CPR is a required field',
              })}
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
            <FormControl fullWidth>
              <InputLabel id="tax-card-label">Tax card</InputLabel>
              <Select
                labelId="tax-card-label"
                id="tax-card"
                label="Tax card"
                defaultValue=""
                {...register('tax_card', {
                  required: 'Tax card is a required field',
                })}
                fullWidth
              >
                <MenuItem value="main">Main Tax Card</MenuItem>
                <MenuItem value="secondary">Secondary Tax Card</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel id="requested-salary-payment-label">
                Requested salary payment type *
              </InputLabel>
              <Select
                labelId="requested-salary-payment-label"
                id="requested-salary-payment"
                label="Requested salary payment type *"
                defaultValue="none"
                {...register('salary_payment_type_requested', {
                  required: 'Requested salary payment type is a required field',
                })}
                fullWidth
              >
                <MenuItem value="first">First of Month</MenuItem>
                <MenuItem value="last">Last of Month</MenuItem>
                <MenuItem value="none">None selected</MenuItem>
              </Select>
              <FormHelperText error>
                {errors.salary_payment_type_requested &&
                  (errors.salary_payment_type_requested?.message || '')}
              </FormHelperText>
            </FormControl>
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
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </StyledPaper>
    </form>
  )
}

export default ProfileForm
