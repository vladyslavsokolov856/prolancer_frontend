import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { useJobTypes } from '@/hooks/useJobTypes'
import { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import CurrencyList from 'currency-list'
import FormDialog from '../FormDialog'
import TaskForm, { Inputs as TaskFormInputs } from './TaskForm'
import CustomerForm, { Inputs as CustomerFormInputs } from './CustomerForm'

export type Inputs = {
  customer_id: number
  send_invoice_copy_to: string
  task_id: number
  created_date: Dayjs | null
  customer_payment_date: Dayjs | null
  invoice_date: Dayjs | null
  reference: string
  hours_worked: number
  job_type_id: number
  currency: string
  payment_days: string
  terms_accepted: boolean
}

const customers = [
  {
    id: 1,
    name: 'customer 1',
    email: 'customer1@gmail.com',
    first_name: 'C1',
    last_name: 'Customer 1',
  },
  {
    id: 2,
    name: 'customer 2',
    email: 'customer1@gmai2.com',
    first_name: 'C2',
    last_name: 'Customer 2',
  },
]

const tasks = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
]

const currencies = CurrencyList.getAll('en_US')

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

interface InvoiceFormProps {
  form: UseFormReturn<Inputs, any, any>
  onSubmit: SubmitHandler<Inputs>
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ form, onSubmit }) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form

  const taskHookForm = useForm<TaskFormInputs>()
  const customerHookForm = useForm<CustomerFormInputs>()

  const customerId = watch('customer_id')

  const { data: jobTypes } = useJobTypes()

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [formType, setFormType] = useState<'Customer' | 'Task'>('Customer')

  useEffect(() => {
    setSelectedCustomer(
      customers.find((customer) => customer.id === customerId)
    )
  }, [customerId])

  const handleCreateCustomerClick = () => {
    setShowDialog(true)
    setFormType('Customer')
  }

  const onCustomerFormSubmit: SubmitHandler<CustomerFormInputs> = async (
    data
  ) => {
    setShowDialog(false)
    customerHookForm.reset()
  }

  const handleCreateTaskClick = () => {
    setShowDialog(true)
    setFormType('Task')
  }

  const onTaskFormSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    setShowDialog(false)
    taskHookForm.reset()
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledPaper>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <SectionHeader title="Customer" />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" sx={{ width: '100%', gap: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel id="customer-label">Customer *</InputLabel>
                  <Select
                    labelId="customer-label"
                    id="customer"
                    label="Customer *"
                    defaultValue=""
                    {...register('customer_id', {
                      required: 'Customer is a required field',
                    })}
                    fullWidth
                    error={!!errors.customer_id}
                  >
                    {customers?.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {errors.customer_id && (errors.customer_id?.message || '')}
                  </FormHelperText>
                </FormControl>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ minWidth: '200px' }}
                  onClick={handleCreateCustomerClick}
                >
                  Create customer
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer contact *"
                style={{ margin: '1px' }}
                disabled
                value={
                  selectedCustomer
                    ? `${selectedCustomer.first_name} ${selectedCustomer.last_name}`
                    : ''
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer email *"
                style={{ margin: '1px' }}
                disabled
                value={selectedCustomer ? selectedCustomer.email : ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Send invoice copy to"
                style={{ margin: '1px' }}
                {...register('send_invoice_copy_to')}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Task details" />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" sx={{ width: '100%', gap: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel id="task-label">Task *</InputLabel>
                  <Select
                    labelId="task-label"
                    id="task"
                    label="Task *"
                    defaultValue=""
                    {...register('task_id', {
                      required: 'Task is a required field',
                    })}
                    fullWidth
                    error={!!errors.task_id}
                  >
                    {tasks?.map(({ id, title }) => (
                      <MenuItem key={id} value={id}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {errors.task_id && (errors.task_id?.message || '')}
                  </FormHelperText>
                </FormControl>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ minWidth: '200px' }}
                  startIcon={<AddIcon />}
                  onClick={handleCreateTaskClick}
                >
                  Create task
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Invoice information" />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                defaultValue={getValues('invoice_date') || null}
                {...register('invoice_date', {
                  required: 'Invoice date is required field',
                })}
                onChange={(value) => setValue('invoice_date', value)}
                label="Invoice Date *"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.invoice_date,
                    helperText: errors.invoice_date?.message || '',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer reference"
                style={{ margin: '1px', marginBottom: '.75rem' }}
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
              <DatePicker
                defaultValue={getValues('created_date') || null}
                {...register('created_date', {
                  required: 'Start date is required field',
                })}
                onChange={(value) => setValue('created_date', value)}
                label="Start Date *"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.created_date,
                    helperText: errors.created_date?.message || '',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                defaultValue={getValues('customer_payment_date') || null}
                {...register('customer_payment_date', {
                  required: 'End date is required field',
                })}
                onChange={(value) => setValue('customer_payment_date', value)}
                label="End Date *"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.customer_payment_date,
                    helperText: errors.customer_payment_date?.message || '',
                  },
                }}
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Hours worked *"
                type="number"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.hours_worked}
                {...register('hours_worked', {
                  required: 'Hours worked is a reuqired field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.hours_worked &&
                      (errors.hours_worked?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Payment details" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Payment days *"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.payment_days}
                {...register('payment_days', {
                  required: 'Payment days is required field',
                })}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.payment_days &&
                      (errors.payment_days?.message || '')}
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
                  label="Currency *"
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
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Invoice with VAT"
              />
              <div
                style={{
                  color: '#98a6ad',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}
              >
                As a starting point, there is always VAT on your services,
                unless it falls within special categories or is for companies
                outside Denmark in the EU.
              </div>
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Order llines" />
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
                label="Terms accpeted *"
              />
              <FormHelperText error>
                {errors.terms_accepted &&
                  (errors.terms_accepted?.message || '')}
              </FormHelperText>
            </Grid>
          </Grid>

          <Divider />

          <Box display="flex" sx={{ gap: '10px' }}>
            <Button color="primary" variant="contained">
              Save as draft
            </Button>
            <Button color="primary" variant="contained">
              Submit invoice
            </Button>
          </Box>
        </StyledPaper>
      </form>

      <FormDialog
        open={showDialog}
        setOpen={setShowDialog}
        title={formType === 'Customer' ? 'Create Customer' : 'Create Task'}
        content={
          formType === 'Customer' ? (
            <CustomerForm
              form={customerHookForm}
              onSubmit={onCustomerFormSubmit}
            />
          ) : (
            <TaskForm form={taskHookForm} onSubmit={onTaskFormSubmit} />
          )
        }
      />
    </Box>
  )
}

export default InvoiceForm
