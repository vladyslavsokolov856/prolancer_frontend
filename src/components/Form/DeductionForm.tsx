import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import CurrencyList from 'currency-list'

import { useTasks } from '@/hooks/useTasks'
import ProSelect from '../ProSelect'
import ProInput from '../ProInput'
import ProFileField from '../ProFileInput'

export type DeductionInputs = {
  task_id: string
  description: string
  currency: string
  amount: string
  include_vat: boolean
  attachment: File
}

type DeductionFormProps = {
  onSubmit: SubmitHandler<DeductionInputs>
}

const currencies = CurrencyList.getAll('en_US')

const DeductionForm: React.FC<DeductionFormProps> = ({ onSubmit }) => {
  const { register, setValue, watch, handleSubmit } = useForm<DeductionInputs>()

  const { tasks } = useTasks()

  const attachment = watch('attachment')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ padding: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <ProSelect
              label="Task"
              defaultValue=""
              {...register('task_id', { required: true })}
              required
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
              {...register('description', { required: true })}
              required
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <ProSelect
              label="Currency"
              defaultValue=""
              required
              {...register('currency', { required: true })}
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
              {...register('amount', { required: true })}
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
            <ProFileField
              accept={{ 'image/*': ['.jpeg', '.png', '.pdf'] }}
              onDrop={(acceptedFiles) => {
                setValue('attachment', acceptedFiles[0])
              }}
            />
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
          Submit deduction
        </Button>
      </Paper>
    </form>
  )
}

export default DeductionForm
