import { Box, BoxProps, Typography } from '@mui/material'

interface LogoIconProps extends BoxProps {
  color?: string
}

const LogoIcon: React.FC<LogoIconProps> = ({ color = 'white', ...props }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      {...props}
    >
      {/* <Logo style={{ fill: color }} /> */}
      <Typography fontSize={40} color={color}>
        factofly
      </Typography>
    </Box>
  )
}

export default LogoIcon
