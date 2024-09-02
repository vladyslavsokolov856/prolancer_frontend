import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Typography,
  IconButton,
  Menu,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined'
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined'
import { navigationConfig } from '@/config/navigation'
import { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext, AuthContextType } from '@/context/auth'

interface IAppbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Appbar: React.FC<IAppbarProps> = () => {
  const { pathname } = useLocation()

  const { signout } = useContext(AuthContext) as AuthContextType

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const dropDownConfigItems = navigationConfig.slice(
    0,
    navigationConfig.length - 3
  )

  const responsiveDropDownConfigItems = navigationConfig.slice(
    0,
    navigationConfig.length - 1
  )

  const appBarConfigItems = navigationConfig.slice(navigationConfig.length - 2)

  const appBarItems = appBarConfigItems.map(({ label, to, icon: ItemIcon }) => (
    <Button
      key={label}
      onClick={handleCloseNavMenu}
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      <Link to={to as string}>
        {ItemIcon && <ItemIcon />}&nbsp;
        {label}
      </Link>
    </Button>
  ))

  const resDropDownItems = responsiveDropDownConfigItems.map(
    ({ label, to, icon: ItemIcon }) => (
      <ListItemButton
        key={to}
        component={Link}
        to={to as string}
        sx={{ bgcolor: 'white', padding: '10px 30px' }}
        selected={to === pathname}
      >
        {ItemIcon && (
          <ListItemIcon
            sx={{
              margin: '0 10px 0 0',
              minWidth: '20px',
              color: 'rgb(1, 66, 194)',
            }}
          >
            <ItemIcon />
          </ListItemIcon>
        )}
        <ListItemText
          sx={{
            whiteSpace: 'nowrap',
            color: 'rgb(1, 66, 194)',
            fontSize: '1.1rem',
          }}
        >
          {label}
        </ListItemText>
      </ListItemButton>
    )
  )

  const dropdownItems = dropDownConfigItems.map(
    ({ label, to, icon: ItemIcon }) => (
      <ListItemButton
        key={to}
        component={Link}
        to={to as string}
        sx={{ bgcolor: 'white', padding: '10px 30px' }}
        selected={to === pathname}
      >
        {ItemIcon && (
          <ListItemIcon
            sx={{
              margin: '0 10px 0 0',
              minWidth: '20px',
              color: 'rgb(1, 66, 194)',
            }}
          >
            <ItemIcon />
          </ListItemIcon>
        )}
        <ListItemText
          sx={{
            whiteSpace: 'nowrap',
            color: 'rgb(1, 66, 194)',
            fontSize: '1.1rem',
          }}
        >
          {label}
        </ListItemText>
      </ListItemButton>
    )
  )

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Prolancer
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {resDropDownItems}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Prolancer
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {appBarItems}
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color: 'white' }}
            >
              <ShortcutOutlinedIcon />
              &nbsp; Shortcuts
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ mt: '-10px' }}
            >
              {dropdownItems}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={signout} sx={{ p: 0 }}>
              <Typography sx={{ textAlign: 'center', color: 'white' }}>
                <OutputOutlinedIcon />
                &nbsp; LOGOUT
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Appbar
