import { InputLabel, Select, SelectProps, Stack } from '@mui/material'
import { ReactNode, forwardRef } from 'react'

type ProSelectProps = {
  helperText?: ReactNode
} & SelectProps

const ProSelect = forwardRef<unknown, ProSelectProps>(
  ({ label, required, helperText, sx, ...selectProps }, ref) => {
    return (
      <Stack marginY={0.5} sx={sx}>
        <InputLabel sx={{ my: 0.5 }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>
        <Select {...selectProps} size="small" ref={ref}>
          {selectProps.children}
        </Select>
        {selectProps.error ? helperText : null}
      </Stack>
    )
  }
)

export default ProSelect
