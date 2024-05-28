import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { UseFormReturn, SubmitHandler, Controller } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CurrencyList from 'currency-list'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useJobTypes } from '@/hooks/useJobTypes'
import { useCustomers } from '@/hooks/userCustomers'
import Task from '@/types/tasks'

export type Inputs = {
  customer_id: number
  status: string
  title: string
  reference: string
  purchase_order_number: string
  description: string
  customer_message: string
  job_type_id: number
  start_date: Dayjs | null
  end_date: Dayjs | null
  terms_accepted: boolean
  payment_term: string
  payment_term_days: number
  payment_type: string
  payment_amount: number
  currency: string
  request_allow_mileages: boolean
  show_customer_price: boolean
  allow_mileages: boolean
  is_retainer: boolean
  expected_minutes: number
}

const currencies = CurrencyList.getAll('en_US')

const paymentTerms = [
  { key: 'current_month', name: 'Current month' },
  { key: 'onging_week', name: 'Onging week' },
  { key: 'other', name: 'Other' },
  { key: 'task_end', name: 'Task end' },
]

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

interface PreviewDialogProps {
  data: Inputs
  customer: any
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  data,
  open,
  setOpen,
  customer,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <BootstrapDialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle sx={{ m: 0, p: 2, color: '#98a6ad' }}>
        [ACTION REQUIRED] Confirmation of task from Guesmia Abdelmadjid
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            color: '#98a6ad',
          }}
        >
          <p>
            Dear {customer?.first_name} {customer?.last_name},
          </p>
          <p>
            We are writing from Factofly, a freelance agency that Guesmia
            Abdelmadjid uses to perform and bill for work to be delivered to
            you.
          </p>
          <p>
            <strong>The work to be done is:</strong>
          </p>
          <div style={{ marginLeft: '30px' }}>
            <blockquote>
              <p>
                <strong>{data.title}</strong>
              </p>
            </blockquote>
            <blockquote>
              <p>
                <em>{data.description}</em>
              </p>
            </blockquote>
          </div>
          <p>
            To ensure compliance, we therefore ask you to confirm that an
            agreement on the above job description has been entered into, as
            well as the conditions below.
          </p>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: '24px' }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled
              sx={{
                width: '200px',
                backgroundColor: 'rgb(1, 66, 194) !important',
                borderRadius: '30px',
                padding: '20px',
                margin: '0px 20px 20px',
                color: 'white !important',
                opacity: '0.65',
              }}
            >
              Confirm task
            </Button>
          </Box>
          <p>
            <strong>What is Factofly?</strong>
          </p>
          <p>
            Factofly is a service that freelancers use to perform work through
            and send invoices from. We hire the freelancer for the project while
            the work is carried out for you, as well as take care of the
            invoicing and administration and ensure that the freelancer is
            insured during work.
          </p>
          <p>
            This means that you as a company enter into an agreement with
            Factofly regarding the work in question. The invoice therefore comes
            from us - on behalf of the freelancer - and must also be paid to us.
          </p>
          <p>
            <strong>The fine print - the conditions*</strong>
          </p>
          <p>
            ​** The worker (Freelancer) is, in connection with the performance
            of this task, a project employee of Factofly. Therefore, if there
            are changes to the above job description, Factofly must be notified
            in writing in order for them to take effect.*
          </p>
          <p>
            <em>
              Factofly ensures full compliance for all parties involved, and is
              responsible for the employee being covered by liability and
              workers' compensation insurance. Factofly also withholds and
              settles all taxes and fees in connection with the employment of
              the employee in connection with this task.
            </em>
          </p>
          <p>
            Please write to us if you have any questions or call us on +45 71 96
            00 54. ​
          </p>
          <p>Sincerely</p>
          <p>Factofly on behalf of Guesmia Abdelmadjid</p>
        </div>
      </DialogContent>
    </BootstrapDialog>
  )
}

interface TaskFormProps {
  form: UseFormReturn<Inputs, any, any>
  onSubmit: SubmitHandler<Inputs>
  submitButtonDisabled?: boolean
  type?: 'Create' | 'Update'
  initialValues?: Task | null
}

const TaskForm: React.FC<TaskFormProps> = ({
  form,
  onSubmit,
  submitButtonDisabled = false,
  type = 'Create',
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    control,
    formState: { errors, isValid },
  } = form

  const { data: jobTypes, isLoading: isJobTypesLoading } = useJobTypes()
  const { customers, isLoading: isCustomersLoading } = useCustomers()

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const customerId = watch('customer_id')

  const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  }))

  const handlePreview = () => {
    if (!isValid) {
      form.trigger()
      setShowErrorAlert(true)
    } else {
      setShowErrorAlert(false)
      setShowPreviewDialog(true)
    }
  }

  useEffect(() => {
    if (initialValues && !isCustomersLoading && !isJobTypesLoading) {
      const { id, start_date, end_date, ...rest } = initialValues
      reset(rest)
      setValue('start_date', dayjs(start_date))
      setValue('end_date', dayjs(end_date))
    }
    setValue('status', 'sent')
  }, [initialValues, isCustomersLoading, isJobTypesLoading])

  useEffect(() => {
    const selectedCustomerData = customers.find(
      (customer) => customer.id === customerId
    )
    setSelectedCustomer(selectedCustomerData)
  }, [customerId])

  const handleSaveasDraft = () => {
    if (isValid) {
      setValue('status', 'draft')
      onSubmit(getValues())
    } else {
      form.trigger()
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledPaper elevation={4}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <SectionHeader title="Customer" />
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="flex-start"
                sx={{ width: '100%', gap: '10px' }}
              >
                <FormControl fullWidth sx={{ flexGrow: 1 }}>
                  <InputLabel id="customer-label">Customer *</InputLabel>
                  <Select
                    labelId="customer-label"
                    id="customer_id"
                    label="Customer"
                    defaultValue={getValues('customer_id') || ''}
                    {...register('customer_id', {
                      required: 'Customer is a required field',
                    })}
                    error={!!errors.customer_id}
                    fullWidth
                  >
                    {customers.map(({ id, name_contact_person }) => (
                      <MenuItem key={id} value={id}>
                        {name_contact_person}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {errors.customer_id && (errors.customer_id?.message || '')}
                  </FormHelperText>
                </FormControl>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={RouterLink}
                  to="/customers/new"
                  sx={{ width: '200px', minHeight: '55px' }}
                >
                  Create Customer
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer contact *"
                value={
                  selectedCustomer
                    ? `${selectedCustomer?.name_contact_person}`
                    : ''
                }
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer email *"
                type="email"
                value={
                  selectedCustomer
                    ? `${selectedCustomer?.email_contact_person}`
                    : ''
                }
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Payment" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="payment-term-label">Payment Term *</InputLabel>
                <Select
                  labelId="payment-term-label"
                  id="payment-term"
                  label="Payment Term"
                  defaultValue={getValues('payment_term') || ''}
                  {...register('payment_term', {
                    required: 'Payment term is a required field',
                  })}
                  fullWidth
                  error={!!errors.payment_term}
                >
                  {paymentTerms.map(({ key, name }) => (
                    <MenuItem key={key} value={key}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {errors.payment_term && (errors.payment_term?.message || '')}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Payment days *"
                type="number"
                error={!!errors.payment_term_days}
                {...register('payment_term_days', {
                  required: 'Payment days is a reuqired field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.payment_term_days &&
                      (errors.payment_term_days?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Task information" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title *"
                error={!!errors.title}
                {...register('title', {
                  required: 'Title is a reuqired field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.title && (errors.title?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer reference"
                error={!!errors.reference}
                {...register('reference')}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.reference && (errors.reference?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="PO Number"
                error={!!errors.purchase_order_number}
                {...register('purchase_order_number')}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.purchase_order_number &&
                      (errors.purchase_order_number?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="job-type-label">Job type *</InputLabel>
                <Select
                  labelId="job-type-label"
                  id="job_type_id"
                  label="Job type"
                  defaultValue={getValues('job_type_id') || ''}
                  {...register('job_type_id', {
                    required: 'Payment term is a required field',
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
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12}>
              <TextField
                label="Task description *"
                error={!!errors.description}
                {...register('description', {
                  required: 'Task description is a reuqired field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.description && (errors.description?.message || '')}
                  </Typography>
                }
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
                <FormLabel
                  id="pyament-type-group-label"
                  sx={{ marginBottom: '10px', marginTop: '10px' }}
                >
                  Payment type
                </FormLabel>
                <Controller
                  name="payment_type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={12} md={4}>
                          <StyledFormControlLabel
                            value="per_day"
                            control={<Radio />}
                            label="Per day"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <StyledFormControlLabel
                            value="per_hour"
                            control={<Radio />}
                            label="Per hour"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <StyledFormControlLabel
                            value="project_price"
                            control={<Radio />}
                            label="Project price"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Payment amount *"
                error={!!errors.payment_amount}
                {...register('payment_amount', {
                  required: 'Payment amount is a reuqired field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.payment_amount &&
                      (errors.payment_amount?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="currency-label">Currency *</InputLabel>
                <Select
                  labelId="currency-label"
                  id="currency"
                  label="Currency"
                  defaultValue={getValues('currency') || ''}
                  {...register('currency', {
                    required: 'Currency is a required field',
                  })}
                  fullWidth
                  error={!!errors.currency}
                >
                  {Object.keys(currencies).map((code) => (
                    <MenuItem key={code} value={code}>
                      {`${code} - ${currencies[code]['name']}`}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {errors.currency && (errors.currency?.message || '')}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register('show_customer_price')}
                          defaultChecked={
                            getValues('show_customer_price') || false
                          }
                        />
                      }
                      label="Show price"
                    />
                    <div style={{ color: '#98a6ad', fontSize: '0.75rem' }}>
                      Select this if you want to show the price of the task for
                      the client
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register('request_allow_mileages')}
                          defaultChecked={
                            getValues('request_allow_mileages') || false
                          }
                        />
                      }
                      label="Request mileages"
                    />
                    <div style={{ color: '#98a6ad', fontSize: '0.75rem' }}>
                      Ask for customer approval for mileages to be added to this
                      task
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register('is_retainer')}
                          defaultChecked={getValues('is_retainer') || false}
                        />
                      }
                      label="Retainer"
                    />
                    <div style={{ color: '#98a6ad', fontSize: '0.75rem' }}>
                      An upfront payment made by the client for ongoing
                      services, guaranteeing availability for a specific period
                      of time
                    </div>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Execution" />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                defaultValue={getValues('start_date') || null}
                {...register('start_date', {
                  required: 'Start date is required field',
                })}
                onChange={(value) => setValue('start_date', value)}
                label="Start Date *"
                sx={{
                  width: '100%',
                  borderRadius: '4px',
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.start_date,
                    helperText: errors.start_date?.message || '',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                defaultValue={getValues('end_date') || null}
                {...register('end_date', {
                  required: 'End date is required field',
                })}
                onChange={(value) => setValue('end_date', value)}
                label="End Date *"
                sx={{
                  width: '100%',
                  borderRadius: '4px',
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.end_date,
                    helperText: errors.end_date?.message || '',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Number of minutes *"
                error={!!errors.expected_minutes}
                {...register('expected_minutes', {
                  required: 'Number of minutes is required field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.expected_minutes &&
                      (errors.expected_minutes?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message *"
                error={!!errors.customer_message}
                {...register('customer_message', {
                  required: 'Message is required field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.customer_message &&
                      (errors.customer_message?.message || '')}
                  </Typography>
                }
                fullWidth
              />
              <div
                style={{
                  color: '#98a6ad',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                This message will be added to the email sent to your customer.
                Use this space to add your own personal message
              </div>
            </Grid>
            <Grid item xs={12}>
              <Alert
                icon={false}
                sx={{
                  backgroundColor: '#f2f6fd',
                  borderColor: '1px solid #eaecef',
                  marginTop: '1.5rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.25rem',
                  color: '#5d6472',
                  width: '100%',
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ gap: '10px', width: '100%' }}
                >
                  <span style={{ flexGrow: 1 }}>
                    Your customer will be sent an email to approve your work in
                    this task. To see a preview of this email, click here.
                  </span>
                  <Button
                    startIcon={
                      <RemoveRedEyeOutlinedIcon
                        sx={{ width: '14px', height: '14px' }}
                      />
                    }
                    variant="contained"
                    sx={{
                      boxShadow: '0 2px 6px 0 hsla(208,7%,46%,.5)',
                      backgroundColor: '#6c757d',
                      fontSize: '14px',
                      height: '30px',
                      width: '190px',
                      padding: '0.28rem 0.8rem',
                    }}
                    onClick={handlePreview}
                  >
                    Show preview
                  </Button>
                </Box>
              </Alert>
              {!isValid && showErrorAlert && (
                <Alert icon={false} color="error" sx={{ marginTop: '10px' }}>
                  Fill out all required fields to see email preview
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                When creating the task, I confirm the general terms and
                conditions and that the information entered is correct and that
                in connection with the performance of this task I am employed by
                Factofly who supervises and has the authority to instruct in
                connection with the employment
              </span>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('terms_accepted', {
                      required: 'Terms accepted is required field',
                    })}
                    defaultChecked={getValues('terms_accepted') || false}
                  />
                }
                label="Terms accpeted"
              />
              <FormHelperText error>
                {errors.terms_accepted &&
                  (errors.terms_accepted?.message || '')}
              </FormHelperText>
            </Grid>
          </Grid>
          <Divider />
          <Box display="flex" style={{ gap: '10px', marginTop: '10px' }}>
            <Button
              variant="contained"
              disabled={submitButtonDisabled}
              onClick={handleSaveasDraft}
            >
              {type === 'Create' ? 'Save as draft' : 'Update Task'}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitButtonDisabled}
            >
              Submit task
            </Button>
          </Box>
        </StyledPaper>
      </form>
      <PreviewDialog
        open={showPreviewDialog}
        setOpen={setShowPreviewDialog}
        data={form.getValues()}
        customer={selectedCustomer}
      />
    </Box>
  )
}

export default TaskForm
