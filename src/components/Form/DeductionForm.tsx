import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import CurrencyList from 'currency-list'

import { useTasks } from '@/hooks/useTasks'
import ProSelect from '../ProSelect'
import ProInput from '../ProInput'
import ProFileField from '../ProFileInput'
import { useCallback, useEffect } from 'react'

export type DeductionInputs = {
  task_id: number
  description: string
  currency: string
  amount: number
  include_vat: boolean
  attachment: File
  image_url?: string
}

type DeductionFormProps = {
  onSubmit: SubmitHandler<DeductionInputs>
  type?: 'create' | 'update'
  initialValues?: Partial<DeductionInputs>
}

const currencies = CurrencyList.getAll('en_US')

const DeductionForm: React.FC<DeductionFormProps> = ({
  onSubmit,
  type,
  initialValues,
}) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<DeductionInputs>({
    mode: 'onChange',
  })

  const { tasks } = useTasks()

  const attachment = watch('attachment')
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ padding: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <ProSelect
              label="Task"
              defaultValue={initialValues?.task_id || ''}
              {...register('task_id', { required: 'Task is required' })}
              required
              error={!!errors.task_id}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.task_id && (errors.task_id?.message || '')}
                </Typography>
              }
            >
              {tasks?.map(({ id, title }) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </ProSelect>
          </Grid>

          <Grid item xs={12}>
            <ProInput
              label="Description"
              {...register('description', {
                required: 'Description is required',
              })}
              required
              error={!!errors.description}
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
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <ProSelect
              label="Currency"
              defaultValue={initialValues?.currency || ''}
              required
              {...register('currency', { required: 'Currency is required' })}
              error={!!errors.currency}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.currency && (errors.currency?.message || '')}
                </Typography>
              }
            >
              {Object.keys(currencies).map((code) => (
                <MenuItem key={code} value={code}>
                  {`${code} - ${currencies[code]['name']}`}
                </MenuItem>
              ))}
            </ProSelect>
          </Grid>

          <Grid item md={6} xs={12}>
            <ProInput
              label="Total"
              required
              {...register('amount', {
                required: 'Please enter the total amount',
                validate: (value) => {
                  // check if value is a number
                  if (isNaN(Number(value))) {
                    return 'Total amount must be a number'
                  }
                  return true
                },
              })}
              error={!!errors.amount}
              helperText={
                <Typography
                  component="span"
                  fontWeight={500}
                  fontSize={11}
                  color="error"
                >
                  {errors.amount && (errors.amount?.message || '')}
                </Typography>
              }
            />
          </Grid>

          <Grid item md={6} xs={12} />
          <Grid item md={6} xs={12}>
            <FormControlLabel
              control={<Checkbox {...register('include_vat')} />}
              label="Include VAT"
            />
          </Grid>

          <Grid item xs={12}>
            {type !== 'create' && (
              <Card sx={{ marginTop: '30px' }}>
                <CardContent>
                  {initialValues?.image_url && (
                    <iframe
                      src={`${VITE_BACKEND_URL}${initialValues?.image_url}`}
                      style={{ width: '100%', height: '500px' }}
                    />
                  )}
                </CardContent>
              </Card>
            )}
            <Controller
              control={control}
              name="attachment"
              rules={{
                required: type === 'create' ? 'Attachment is required' : false,
              }}
              render={({ field: { onChange } }) => (
                <div
                  className={`${
                    errors.attachment ? 'border border-red-500' : ''
                  }`}
                >
                  <ProFileField
                    onChange={(e: any) => onChange(e.target.files[0])}
                    accept={{ 'image/*': ['.jpeg', '.png', '.pdf'] }}
                    onDrop={useCallback((acceptedFiles: File[]) => {
                      setValue('attachment', acceptedFiles[0], {
                        shouldValidate: true,
                      })
                    }, [])}
                  />
                </div>
              )}
            />
            {errors.attachment && (
              <Typography
                component="span"
                fontWeight={500}
                fontSize={11}
                color="error"
              >
                {errors.attachment && (errors.attachment?.message || '')}
              </Typography>
            )}
            {attachment ? (
              <Typography marginY={1}>{attachment.name}</Typography>
            ) : null}
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 4 }} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          {type === 'create' ? 'Submit deduction' : 'Update deduction'}
        </Button>
      </Paper>
    </form>
  )
}

export default DeductionForm
