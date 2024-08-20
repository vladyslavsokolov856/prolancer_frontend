import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { UseFormReturn, SubmitHandler } from 'react-hook-form'
import { Dayjs } from 'dayjs'
import React from 'react'
import ProInput from '../ProInput'
import ProDateTimePicker from '../ProDateTimePicker'

export type Inputs = {
  start_time: Dayjs | null
  duration_minutes: number
  notes: string
}

interface WorkLogFormProps {
  form: UseFormReturn<Inputs, any, any>
  onSubmit: SubmitHandler<Inputs>
  submitButtonDisabled?: boolean
}

const WorkLogForm: React.FC<WorkLogFormProps> = ({
  form,
  onSubmit,
  submitButtonDisabled = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form

  const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  }))

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledPaper elevation={4}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={9}>
              <ProDateTimePicker
                {...register('start_time', {
                  required: 'Invoice date is required field',
                })}
                onChange={(value) => setValue('start_time', value)}
                label="Start Time"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.start_time,
                    helperText: errors.start_time?.message || '',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <ProInput
                label="Duration (minutes) *"
                type="number"
                error={!!errors.duration_minutes}
                {...register('duration_minutes')}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.duration_minutes &&
                      (errors.duration_minutes?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProInput
                label="Notes"
                error={!!errors.notes}
                {...register('notes')}
                helperText={
                  <Typography
                    component="span"
                    fontWeight={500}
                    fontSize={11}
                    color="error"
                  >
                    {errors.notes && (errors.notes?.message || '')}
                  </Typography>
                }
                fullWidth
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: '10px' }} />
          <Box display="flex" style={{ gap: '10px', marginTop: '10px' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitButtonDisabled}
            >
              Submit Work Log
            </Button>
          </Box>
        </StyledPaper>
      </form>
    </Box>
  )
}

export default WorkLogForm
