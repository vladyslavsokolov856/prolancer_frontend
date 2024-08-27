import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useJobTypes } from '@/hooks/useJobTypes'
import dayjs, { Dayjs } from 'dayjs'
import CurrencyList from 'currency-list'
import FormDialog from '../FormDialog'
import TaskForm, { Inputs as TaskFormInputs } from './TaskForm'
import CustomerForm, { Inputs as CustomerFormInputs } from './CustomerForm'
import { useCustomers } from '@/hooks/useCustomers'
import { useTasks } from '@/hooks/useTasks'
import ProSelect from '../ProSelect'
import ProInput from '../ProInput'
import ProDatePicker from '../ProDatePicker'

interface IOrderLine {
  description: string
  quantity: number | null
  unit_price: number | null
}

export type InvoiceInputs = {
  customer_id: number
  send_invoice_copy_to: string
  task_id: number
  invoice_date: Dayjs | string | null
  currency: string
  payment_days: string | number
  terms_accepted?: boolean
  hours_worked: number
  order_lines?: IOrderLine[]
  status: string
  vat_percentage: number
}

const currencies = CurrencyList.getAll('en_US')

const StyledPaper = styled(Paper)(({ theme }) => ({
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
    padding: theme.spacing(1),
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
  onSubmit: SubmitHandler<InvoiceInputs>
  type?: 'create' | 'update'
  initialValues?: Partial<InvoiceInputs>
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  onSubmit,
  type,
  initialValues,
}) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvoiceInputs>({ defaultValues: { vat_percentage: 0 } })
  const taskHookForm = useForm<TaskFormInputs>()
  const customerHookForm = useForm<CustomerFormInputs>()

  const { customers } = useCustomers()
  const { tasks } = useTasks()
  const { data: jobTypes } = useJobTypes()
  const formLoaded = useMemo(() => {
    return customers && tasks && jobTypes
  }, [customers, tasks, jobTypes])

  const customerId = watch('customer_id')
  const taskId = watch('task_id')
  const currency = watch('currency', 'DKK')
  const vatPercentage = watch('vat_percentage')
  const orderLines = watch('order_lines', [
    { description: '', quantity: null, unit_price: null },
  ])

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [formType, setFormType] = useState<'Customer' | 'Task'>('Customer')

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const selectedCustomer = useMemo(() => {
    return customers.find(
      (customer) =>
        customer.id === customerId || customer.id === initialValues?.customer_id
    )
  }, [customerId, initialValues, customers])

  const selectedTask = useMemo(() => {
    return tasks.find(
      (task) => task.id === taskId || task.id === initialValues?.task_id
    )
  }, [taskId, initialValues, tasks])

  const totalAmount =
    orderLines?.reduce((pre, cur) => {
      if (cur.quantity && cur.unit_price)
        return pre + cur.quantity * cur.unit_price
      else return pre
    }, 0) || 0

  const handleAddOrderLine = () => {
    setValue('order_lines', [
      ...(orderLines || []),
      { description: '', quantity: null, unit_price: null },
    ])
  }

  const handleDeleteOrderLine = (index: number) => {
    setValue(
      'order_lines',
      (orderLines || []).filter((_, i) => index !== i)
    )
  }

  const handleCreateCustomerClick = () => {
    setShowDialog(true)
    setFormType('Customer')
  }

  const onCustomerFormSubmit: SubmitHandler<CustomerFormInputs> = async () => {
    setShowDialog(false)
    customerHookForm.reset()
  }

  const handleCreateTaskClick = () => {
    setShowDialog(true)
    setFormType('Task')
  }

  const onTaskFormSubmit: SubmitHandler<TaskFormInputs> = async () => {
    setShowDialog(false)
    taskHookForm.reset()
  }

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
              <Stack direction="row" alignItems="end" sx={{ gap: '20px' }}>
                <ProSelect
                  labelId="customer-label"
                  id="customer"
                  label="Customer"
                  defaultValue={initialValues?.customer_id}
                  {...register('customer_id', {
                    required: 'Customer is a required field',
                  })}
                  required
                  fullWidth
                  error={!!errors.customer_id}
                >
                  {customers?.map(({ id, company_name }) => (
                    <MenuItem key={id} value={id}>
                      {company_name}
                    </MenuItem>
                  ))}
                </ProSelect>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ minWidth: '200px', mb: 1 }}
                  onClick={handleCreateCustomerClick}
                >
                  Create customer
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <ProInput
                label="Customer contact"
                style={{ margin: '1px' }}
                disabled
                value={selectedCustomer?.name_contact_person || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProInput
                label="Customer email"
                style={{ margin: '1px' }}
                disabled
                value={selectedCustomer?.email_contact_person || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <ProInput
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
              <Stack direction="row" alignItems="end" sx={{ gap: '20px' }}>
                <ProSelect
                  labelId="task-label"
                  id="task"
                  label="Task"
                  defaultValue={initialValues?.task_id}
                  {...register('task_id', {
                    required: 'Task is a required field',
                  })}
                  required
                  fullWidth
                  error={!!errors.task_id}
                >
                  {tasks?.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>
                      {title}
                    </MenuItem>
                  ))}
                </ProSelect>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ minWidth: '200px', mb: 1 }}
                  startIcon={<AddIcon />}
                  onClick={handleCreateTaskClick}
                >
                  Create task
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <SectionHeader title="Invoice information" />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProDatePicker
                defaultValue={initialValues?.invoice_date as Dayjs}
                {...register('invoice_date', {
                  required: 'Invoice date is required field',
                })}
                required
                onChange={(value) => setValue('invoice_date', value)}
                label="Invoice Date"
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
              <ProInput
                label="Customer reference"
                value={selectedTask ? selectedTask.reference : ''}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProDatePicker
                label="Start Date"
                value={selectedTask ? dayjs(selectedTask.start_date) : null}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProDatePicker
                label="End Date"
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
              <ProSelect
                labelId="job-type-label"
                id="job_type_id"
                label="Job type"
                defaultValue={selectedTask?.job_type_id || ''}
                value={selectedTask ? selectedTask.job_type_id : ''}
                fullWidth
                disabled
              >
                {jobTypes?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </ProSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <ProInput
                label="Hours worked"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.hours_worked}
                {...register('hours_worked', {
                  required: 'Hours worked is required field',
                })}
                required
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
              <ProInput
                label="Payment days"
                style={{ margin: '1px', marginBottom: '.75rem' }}
                error={!!errors.payment_days}
                {...register('payment_days', {
                  required: 'Payment days is required field',
                })}
                required
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
              <ProSelect
                labelId="currency-label"
                id="currency"
                label="Currency"
                value={currency}
                {...register('currency', {
                  required: 'Currency is a required field',
                })}
                required
                fullWidth
                error={!!errors.currency}
              >
                {Object.keys(currencies).map((code) => (
                  <MenuItem key={code} value={code}>
                    {`${code} - ${currencies[code]['name']}`}
                  </MenuItem>
                ))}
              </ProSelect>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vatPercentage > 0}
                    onChange={(_, checked) => {
                      setValue('vat_percentage', checked ? 25 : 0)
                    }}
                  />
                }
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
                    {orderLines?.map(({ quantity, unit_price }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          <ProInput
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
                          <ProInput
                            type="number"
                            error={!!errors.order_lines?.[index]?.quantity}
                            {...register(`order_lines.${index}.quantity`, {
                              valueAsNumber: true,
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
                            size="small"
                            fullWidth
                          />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <ProInput
                            type="number"
                            error={!!errors.order_lines?.[index]?.unit_price}
                            {...register(`order_lines.${index}.unit_price`, {
                              valueAsNumber: true,
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
                            size="small"
                            fullWidth
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() => handleDeleteOrderLine(index)}
                            sx={{ minWidth: '40px' }}
                          >
                            <DeleteIcon
                              sx={{ width: '20px', height: '20px' }}
                            />
                          </Button>
                          <span style={{ fontWeight: 600, marginLeft: '10px' }}>
                            {`${currency} ${
                              quantity && unit_price
                                ? Number(quantity * unit_price).toFixed(2)
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
                        {`${currency} ${totalAmount.toFixed(2)}`}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align="right">
                        VAT {vatPercentage}%
                      </StyledTableCell>
                      <StyledTableCell align="right" sx={{ fontWeight: 600 }}>
                        {`${currency} ${(
                          (totalAmount * vatPercentage) /
                          100
                        ).toFixed(2)}`}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align="right">In total</StyledTableCell>
                      <StyledTableCell align="right" sx={{ fontWeight: 600 }}>
                        {`${currency} ${(
                          totalAmount *
                          (1 + vatPercentage / 100)
                        ).toFixed(2)}`}
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
                label="Terms accepted"
              />
              <FormHelperText error>
                {errors.terms_accepted &&
                  (errors.terms_accepted?.message || '')}
              </FormHelperText>
            </Grid>
          </Grid>

          <Divider />

          <Box display="flex" sx={{ gap: '10px', marginTop: '10px' }}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => setValue('status', 'draft')}
            >
              {type === 'create' ? 'Save as draft' : 'Update invoice'}
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => setValue('status', 'sent')}
            >
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
