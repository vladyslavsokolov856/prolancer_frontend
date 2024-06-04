import { ReactNode, forwardRef } from 'react'
import { InputLabel, Stack } from '@mui/material'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

type ProDatePickerProps = {
  helperText?: ReactNode
  required?: boolean
  error?: boolean
} & DatePickerProps<Dayjs>

const ProDatePicker = forwardRef<unknown, ProDatePickerProps>(
  ({ label, required, helperText, slotProps, sx, ...props }, ref) => {
    return (
      <Stack marginY={0.5} sx={sx} flex={1}>
        <InputLabel sx={{ my: 0.5 }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>

        <DatePicker
          {...props}
          slotProps={{
            ...slotProps,
            textField: {
              fullWidth: true,
              size: 'small',
            },
          }}
        />
        {props.error ? helperText : null}
      </Stack>
    )
  }
)

export default ProDatePicker
