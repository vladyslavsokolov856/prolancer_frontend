import { Box, BoxProps } from '@mui/material';
import { ReactComponent as Logo } from '@/assets/logo.svg';

interface LogoIconProps extends BoxProps {
  color?: string;
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
      <Logo style={{ fill: color }} />
    </Box>
  );
};

export default LogoIcon;