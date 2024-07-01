import { ReactNode, forwardRef } from 'react'
import { InputLabel, Stack } from '@mui/material'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

type ProDateTimePickerProps = {
  helperText?: ReactNode
  required?: boolean
  error?: boolean
} & DateTimePickerProps<Dayjs>

const ProDateTimePicker = forwardRef<unknown, ProDateTimePickerProps>(
  ({ label, required, helperText, slotProps, sx, ...props }) => {
    return (
      <Stack marginY={0.5} sx={sx} flex={1}>
        <InputLabel sx={{ my: 0.5 }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>

        <DateTimePicker
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

export default ProDateTimePicker
