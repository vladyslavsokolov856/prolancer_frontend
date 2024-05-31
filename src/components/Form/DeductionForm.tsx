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
import { useForm } from 'react-hook-form'
import CurrencyList from 'currency-list'

import { useTasks } from '@/hooks/useTasks'
import ProSelect from '../ProSelect'
import ProInput from '../ProInput'
import ProFileField from '../ProFileInput'

export type DeducitonInputs = {
  task_id: string
  description: string
  currency: string
  amount: string
  includeVat: boolean
  attachment: File
}

const currencies = CurrencyList.getAll('en_US')

const DeductionForm = () => {
  const { register, setValue, watch } = useForm<DeducitonInputs>()

  const { tasks } = useTasks()

  const attachment = watch('attachment')

  return (
    <form>
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
              control={<Checkbox {...register('includeVat')} />}
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

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit deduction
        </Button>
      </Paper>
    </form>
  )
}

export default DeductionForm
