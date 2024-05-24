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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { useJobTypes } from '@/hooks/useJobTypes'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import CurrencyList from 'currency-list'
import FormDialog from '../FormDialog'
import TaskForm, { Inputs as TaskFormInputs } from './TaskForm'
import CustomerForm, { Inputs as CustomerFormInputs } from './CustomerForm'

interface IOrderLine {
  description: string
  quantity: number | null
  unitPrice: number | null
}

export type Inputs = {
  customer_id: number
  send_invoice_copy_to: string
  task_id: number
  invoice_date: Dayjs | null
  currency: string
  payment_days: string
  terms_accepted: boolean
  order_lines: IOrderLine[]
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
  {
    id: 1,
    title: 'Task 1',
    start_date: Date.now(),
    end_date: Date.now(),
    reference: 'reference 1',
    job_type_id: 1,
    minutes_spent: 20,
  },
  {
    id: 2,
    title: 'Task 2',
    start_date: Date.now(),
    end_date: Date.now(),
    reference: 'reference 2',
    job_type_id: 2,
    minutes_spent: 10,
  },
]

const currencies = CurrencyList.getAll('en_US')

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#313a46',
    color: theme.palette.common.white,
    border: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#6c757d',
    fontSize: 14,
    border: 'none',
  },
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
  const taskId = watch('task_id')
  const orderLines = watch('order_lines', [
    { description: '', quantity: null, unitPrice: null },
  ])

  const { data: jobTypes } = useJobTypes()

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [formType, setFormType] = useState<'Customer' | 'Task'>('Customer')
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    setSelectedCustomer(
      customers.find((customer) => customer.id === customerId)
    )
  }, [customerId])

  useEffect(() => {
    setSelectedTask(tasks.find((task) => task.id === taskId))
  }, [taskId])

  useEffect(() => {
    console.log('Hello')
    const mount = orderLines?.reduce((pre, cur) => {
      if (cur.quantity && cur.unitPrice)
        return pre + cur.quantity * cur.unitPrice
      else return pre
    }, 0)
    setTotalAmount(mount || 0)
  })

  const handleAddOrderLine = () => {
    setValue('order_lines', [
      ...(orderLines || []),
      { description: '', quantity: null, unitPrice: null },
    ])
  }

  const handleDeelteOrderLine = (index: number) => {
    setValue(
      'order_lines',
      (orderLines || []).filter((item, i) => index !== i)
    )
  }

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
                value={selectedTask ? selectedTask.reference : ''}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Start Date *"
                value={selectedTask ? dayjs(selectedTask.start_date) : null}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="End Date *"
                value={selectedTask ? dayjs(selectedTask.end_date) : null}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="job-type-label">Job type *</InputLabel>
                <Select
                  labelId="job-type-label"
                  id="job_type_id"
                  label="Job type"
                  value={selectedTask ? selectedTask.job_type_id : ''}
                  fullWidth
                  disabled
                >
                  {jobTypes?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Hours worked *"
                type="number"
                value={selectedTask ? selectedTask.minutes_spent : ''}
                fullWidth
                disabled
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Quantity</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell sx={{ minWidth: '180px' }}>
                        Total
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderLines?.map(({ quantity, unitPrice }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          <TextField
                            label="Description"
                            error={!!errors.order_lines?.[index]?.description}
                            {...register(`order_lines.${index}.description`)}
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
                            size="small"
                            fullWidth
                          />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <TextField
                            label="Quantity"
                            type="number"
                            error={!!errors.order_lines?.[index]?.quantity}
                            {...register(`order_lines.${index}.quantity`)}
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
                            size="small"
                            fullWidth
                          />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <TextField
                            label="Unit Price"
                            type="number"
                            error={!!errors.order_lines?.[index]?.unitPrice}
                            {...register(`order_lines.${index}.unitPrice`)}
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
                            size="small"
                            fullWidth
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() => handleDeelteOrderLine(index)}
                            sx={{ minWidth: '40px' }}
                          >
                            <DeleteIcon
                              sx={{ width: '20px', height: '20px' }}
                            />
                          </Button>
                          <span style={{ fontWeight: 600, marginLeft: '10px' }}>
                            {`DKK ${
                              quantity && unitPrice
                                ? Number(quantity * unitPrice).toFixed(2)
                                : '0.00'
                            }`}
                          </span>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <StyledTableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleAddOrderLine}
                        >
                          Add order line
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell rowSpan={3} />
                      <StyledTableCell rowSpan={3} />
                      <StyledTableCell align="right">Subtotal</StyledTableCell>
                      <StyledTableCell align="right" sx={{ fontWeight: 600 }}>
                        {`DKK ${totalAmount.toFixed(2)}`}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align="right">VAT 25%</StyledTableCell>
                      <StyledTableCell align="right" sx={{ fontWeight: 600 }}>
                        {`DKK ${(totalAmount / 4).toFixed(2)}`}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align="right">In total</StyledTableCell>
                      <StyledTableCell align="right" sx={{ fontWeight: 600 }}>
                        {`DKK ${(totalAmount * 1.25).toFixed(2)}`}
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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

          <Box display="flex" sx={{ gap: '10px', marginTop: '10px' }}>
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
