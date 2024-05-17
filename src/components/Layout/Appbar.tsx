import { Box, Avatar, Hidden, Button, useTheme } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import LogoIcon from '../Utils/LogoIcon'

interface IAppbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Appbar: React.FC<IAppbarProps> = ({ setOpen }) => {
  const theme = useTheme()

  const handleToggleSidebar = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        padding: theme.spacing(0, 3),
        backgroundColor: '#fff',
        boxShadow: '0 0 8px 0 hsla(215, 9%, 64%, .15)',
        minHeight: '70px',
        zIndex: 1001,
        textAlign: 'left',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Hidden smUp>
          <Box display="flex">
            <Button onClick={handleToggleSidebar}>
              <MenuIcon sx={{ color: 'black' }} />
            </Button>
            <LogoIcon color="black" width="125px" height="50px" />
          </Box>
        </Hidden>
      </Box>
      <Box
        display="flex"
        sx={{
          flexDirection: 'row',
          backgroundColor: 'rgb(250, 251, 253)',
          color: 'rgb(152, 166, 173)',
        }}
      >
        <Avatar src="/broken-image.jpg" />
        <Box
          display="flex"
          sx={{ flexDirection: 'column', paddingLeft: '10px' }}
        >
          <span style={{ fontWeight: 600 }}>Guesmia Abdelmadjid</span>
          <span style={{ fontSize: '12px', marginTop: '-3px' }}>User</span>
        </Box>
      </Box>
    </Box>
  )
}

export default Appbar
