import {
  Box,
  MenuItem,
  FormControlLabel,
  Paper,
  Grid,
  Checkbox,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import { countries } from 'countries-list'
import { styled } from '@mui/material/styles'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import ProInput from '../ProInput'
import ProSelect from '../ProSelect'
import ProRadioGroup from '../ProRadioGroup'
import { useEffect } from 'react'
import Customer from '@/types/customers'

export type Inputs = {
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
}))

const languageOptions = ['Danish', 'English'].map((lang) => (
  <MenuItem key={lang} value={lang}>
    {lang}
  </MenuItem>
))

interface CustomerFormProps {
  form: UseFormReturn<Inputs, any, any>
  onSubmit: SubmitHandler<Inputs>
  type?: 'Create' | 'Update'
  submitButtonDisabled?: boolean
  initialValues?: Customer | null
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  form,
  onSubmit,
  submitButtonDisabled = false,
  type = 'Create',
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = form
  const country = watch('country')

  useEffect(() => {
    reset(initialValues || undefined)
    form.trigger()
  }, [initialValues, form, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledPaper elevation={4}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <ProSelect
              labelId="country-select-label"
              id="country-select"
              label="Country"
              defaultValue={initialValues?.country || ''}
              {...register('country', {
                required: 'Country is a required field',
              })}
              required
              fullWidth
            >
              {Object.entries(countries).map(([countryCode, countryData]) => (
                <MenuItem key={countryCode} value={countryCode}>
                  {countryData.name}
                </MenuItem>
              ))}
            </ProSelect>
          </Grid>

          <Grid item md={6} xs={12}>
            <ProRadioGroup
              label="Customer Type"
              defaultValue={initialValues?.type || ''}
              aria-labelledby="customer-type-radio-group-label"
              required
              options={[
                { label: 'Private', value: 'private' },
                { label: 'Business', value: 'organization' },
              ]}
              onChange={(e) => setValue('type', e.target.value)}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      {country && (
        <StyledPaper elevation={4}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item md={6} xs={12}>
              <ProInput
                label="Company name"
                style={{ margin: '1px' }}
                {...register('company_name', {
                  required: 'Company name is a required field',
                })}
                required
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
              <ProSelect
                label="Language"
                defaultValue={initialValues?.language || 'English'}
                {...register('language', {
                  required: 'Language is a required field',
                })}
                required
              >
                {languageOptions}
              </ProSelect>
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
              <ProInput
                label="Name"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                {...register('name_contact_person')}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <ProInput
                label="Email"
                type="email"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.email_contact_person}
                {...register('email_contact_person', {
                  required: 'Email is a reuqired field',
                })}
                required
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.email_contact_person &&
                      (errors.email_contact_person?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <ProInput
                label="Telephone"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                {...register('phone_contact_person', {
                  required: 'Telephone is a reuqired field',
                })}
                required
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
                A friendly reminder is automatically sent to your customer 4 and
                11 days after the payment date has been exceeded. This is
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
              <ProInput
                label="Address"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.address}
                {...register('address', {
                  required: 'Address is a reuqired field',
                })}
                required
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
              <ProInput
                label="City"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.city}
                {...register('city', {
                  required: 'City is a reuqired field',
                })}
                required
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
                type="number"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                {...register('postal_code', {
                  required: 'Postal code is a reuqired field',
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
              <ProInput
                label="Payment due days"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                type="number"
                {...register('payment_due_days')}
                error={!!errors.payment_due_days}
                fullWidth
              />
              <span style={{ color: '#98a6ad', fontSize: '.75rem' }}>
                Standard number of payment days. Can also be changed per invoice
              </span>
            </Grid>
            <Grid item md={4} xs={12}>
              <ProInput
                label="Organization or registration number"
                type="number"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                {...register('company_id')}
                error={!!errors.company_id}
                fullWidth
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <ProInput
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
          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={submitButtonDisabled}
          >
            {type === 'Create' ? ' Create Customer' : 'Update Customer'}
          </Button>
        </StyledPaper>
      )}
    </form>
  )
}

export default CustomerForm
