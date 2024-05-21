import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
  TextField,
  Grid,
  Checkbox,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import { countries } from 'countries-list'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  country: string
  type: string
  company_name: string
  language: string
  name_contact_person: string
  email_contact_person: string
  phone_contact_person: string
  address: string
  city: string
  postal_code: string
  payment_due_days: number
  company_id: number
  ean: number
}

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
}))

const languageOptions = ['Danish', 'English'].map((lang) => (
  <MenuItem key={lang} value={lang}>
    {lang}
  </MenuItem>
))

const CreateCustomer = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms))

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true)
    await delay(3000)
    console.log(data)
    setIsSubmitting(false)
    reset()
    // navigate('/')
  }

  return (
    <Box display="flex" justifyContent="left" flexDirection="column">
      <Title>Create customer</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledPaper elevation={4}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  label="Country"
                  defaultValue=""
                  {...register('country', {
                    required: 'Country is a required field',
                  })}
                  fullWidth
                >
                  {Object.entries(countries).map(
                    ([countryCode, countryData]) => (
                      <MenuItem key={countryCode} value={countryCode}>
                        {countryData.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl>
                <FormLabel id="customer-type-radio-group-label">
                  Customer type
                </FormLabel>
                <RadioGroup
                  row
                  defaultValue="business"
                  aria-labelledby="customer-type-radio-group-label"
                  {...register('type', {
                    required: 'Customer type is a required field',
                  })}
                  sx={{ gap: '100px' }}
                >
                  <FormControlLabel
                    value="business"
                    control={<Radio />}
                    label="Business"
                  />
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </StyledPaper>

        {watch('country') && (
          <StyledPaper elevation={4}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  label="Company name *"
                  style={{ margin: '1px' }}
                  {...register('company_name', {
                    required: 'Company name is a required field',
                  })}
                  error={!!errors.company_name}
                  helperText={
                    <Typography
                      component="span"
                      fontWeight={500}
                      fontSize={11}
                      color="error"
                    >
                      {errors.company_name &&
                        (errors.company_name?.message || '')}
                    </Typography>
                  }
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Language</InputLabel>
                  <Select
                    label="Language *"
                    defaultValue="English"
                    {...register('language', {
                      required: 'Language is a required field',
                    })}
                  >
                    {languageOptions}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
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
                  Contact person
                </Box>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  label="Name"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  {...register('name_contact_person')}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Email *"
                  type="email"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  error={!!errors.email_contact_person}
                  {...register('email_contact_person', {
                    required: 'Email is a reuqired field',
                  })}
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
                  label="Telephone *"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  {...register('phone_contact_person', {
                    required: 'Telephone is a reuqired field',
                  })}
                  error={!!errors.phone_contact_person}
                  helperText={
                    <Typography
                      component="span"
                      fontWeight={500}
                      fontSize={11}
                      color="error"
                    >
                      {errors.phone_contact_person &&
                        (errors.phone_contact_person?.message || '')}
                    </Typography>
                  }
                  fullWidth
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Send automatic reminders"
                  sx={{
                    marginBottom: '3px',
                    paddingRight: '23px',
                    fontWeight: 600,
                    color: '#98a6ad',
                  }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <span style={{ color: '#98a6ad', fontSize: '.75rem' }}>
                  A friendly reminder is automatically sent to your customer 4
                  and 11 days after the payment date has been exceeded. This is
                  mandatory if you choose quick payout.
                </span>
              </Grid>
              <Grid item md={12} xs={12}>
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
                  Address information
                </Box>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  label="Address *"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  error={!!errors.address}
                  {...register('address', {
                    required: 'Address is a reuqired field',
                  })}
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
                <span style={{ color: '#98a6ad', fontSize: '.75rem' }}>
                  The company's street name and number
                </span>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="City *"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  error={!!errors.city}
                  {...register('city', {
                    required: 'City is a reuqired field',
                  })}
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
                  type="number"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  {...register('postal_code', {
                    required: 'Postal code is a reuqired field',
                  })}
                  error={!!errors.postal_code}
                  helperText={
                    <Typography
                      component="span"
                      fontWeight={500}
                      fontSize={11}
                      color="error"
                    >
                      {errors.postal_code &&
                        (errors.postal_code?.message || '')}
                    </Typography>
                  }
                  fullWidth
                />
              </Grid>
              <Grid item md={12} xs={12}>
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
                  Payment due days
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Payment due days"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  type="number"
                  {...register('payment_due_days')}
                  error={!!errors.payment_due_days}
                  fullWidth
                />
                <span style={{ color: '#98a6ad', fontSize: '.75rem' }}>
                  Standard number of payment days. Can also be changed per
                  invoice
                </span>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Organization or registration number"
                  type="number"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  {...register('company_id')}
                  error={!!errors.company_id}
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="EAN"
                  type="number"
                  style={{ margin: '1px', marginBottom: '.75rem' }}
                  {...register('ean')}
                  fullWidth
                />
                <span style={{ color: '#98a6ad', fontSize: '.75rem' }}>
                  The customer's EAN number used to invoice. Only use if your
                  customer has provided an EAN. Otherwise leave empty
                </span>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
            <Button type="submit" variant="contained">
              Create Customer
            </Button>
          </StyledPaper>
        )}
      </form>
    </Box>
  )
}

export default CreateCustomer
