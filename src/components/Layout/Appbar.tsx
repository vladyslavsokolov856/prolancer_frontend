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
import { navigationConfig } from '@/config/navigation'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserAvatarMenu from '../UserAvatarMenu'

interface IAppbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const appBarConfigItems = navigationConfig.slice(0, 2)

const dropDownConfigItems = navigationConfig.slice(2)

const Appbar: React.FC<IAppbarProps> = () => {
  const { pathname } = useLocation()


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

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const appBarItems = appBarConfigItems.map(({ label, to, icon: ItemIcon }) => (
    <Button
      key={label}
      sx={{ color: 'white', mx: 1 }}
      component={Link}
      to={to as string}
      startIcon={ItemIcon ? <ItemIcon /> : null}
    >
      {label}
    </Button>
  ))

  const resDropDownItems = navigationConfig.map(
    ({ label, to, icon: ItemIcon }) => (
      <ListItemButton
        key={to}
        component={Link}
        to={to as string}
        sx={{ bgcolor: 'white', padding: '10px 30px' }}
        selected={to === pathname}
        onClick={handleCloseNavMenu}
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
        onClick={handleCloseMenu}
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
            component={Link}
            to="/"
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
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
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
              sx={{ color: 'white', mx: 1 }}
              startIcon={<ShortcutOutlinedIcon />}
            >
              Shortcuts
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
            <UserAvatarMenu/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Appbar
