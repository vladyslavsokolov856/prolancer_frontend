import {
  Box,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { forwardRef } from 'react'

type ProRadioGroupProps = RadioGroupProps & {
  label?: string
  required?: boolean
  options: Array<{ value: string; label: string; description?: string }>
}

const ProRadioGroup = forwardRef<unknown, ProRadioGroupProps>(
  ({ label, required, sx, options, ...props }, ref) => {
    const theme = useTheme()

    return (
      <Stack marginY={0.5} sx={sx}>
        <InputLabel sx={{ my: 0.5 }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>

        <RadioGroup row {...props} ref={ref} sx={{ gap: 2 }}>
          {options.map(({ value, label, description }) => (
            <Stack
              sx={{
                flex: 1,
                border: 1,
                px: 1,
                borderRadius: '4px',
                borderColor: theme.palette.grey[400],
              }}
            >
              <FormControlLabel
                value={value}
                control={<Radio size="small" />}
                label={
                  description ? (
                    <Stack mt={1}>
                      {label}
                      <Typography color="GrayText" fontSize="0.8rem" my={0.5}>
                        {description}
                      </Typography>
                    </Stack>
                  ) : (
                    label
                  )
                }
                key={value}
              />
            </Stack>
          ))}
        </RadioGroup>
      </Stack>
    )
  }
)

export default ProRadioGroup
