import {
  Box,
  Drawer,
  Hidden,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { navigationConfig } from '@/config/navigation'
import { Link, useLocation } from 'react-router-dom'
import LogoIcon from '@/components/Utils/LogoIcon'

interface ISidebarProps {
  open: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ open }) => {
  const { pathname } = useLocation()

  const theme = useTheme()

  const navItems = useMemo(() => {
    const firstNavigationConfigItems = navigationConfig.slice(
      0,
      navigationConfig.length - 4
    )
    const secondNavigationConfigItems = navigationConfig.slice(
      navigationConfig.length - 4
    )

    const firstNavItems = firstNavigationConfigItems.map(
      ({ label, to, icon: ItemIcon }) => (
        <ListItemButton
          key={to}
          component={Link}
          to={to as string}
          sx={{ color: 'black', padding: '10px 30px' }}
          selected={to === pathname}
        >
          {ItemIcon && (
            <ListItemIcon
              sx={{ margin: '0 10px 0 0', minWidth: '20px', color: '#f5fafd' }}
            >
              <ItemIcon></ItemIcon>
            </ListItemIcon>
          )}
          <ListItemText
            sx={{ whiteSpace: 'nowrap', color: '#f5fafd', fontSize: '1.1rem' }}
          >
            {label}
          </ListItemText>
        </ListItemButton>
      )
    )

    const secondNavItems = secondNavigationConfigItems.map(
      ({ label, to, icon: ItemIcon }) => (
        <ListItemButton
          key={to}
          component={Link}
          to={to as string}
          sx={{ color: 'black', padding: '10px 30px' }}
          selected={to === pathname}
        >
          {ItemIcon && (
            <ListItemIcon
              sx={{ margin: '0 10px 0 0', minWidth: '20px', color: '#f5fafd' }}
            >
              <ItemIcon></ItemIcon>
            </ListItemIcon>
          )}
          <ListItemText
            sx={{ whiteSpace: 'nowrap', color: '#f5fafd', fontSize: '1.1rem' }}
          >
            {label}
          </ListItemText>
        </ListItemButton>
      )
    )

    return (
      <>
        <span
          style={{
            padding: '12px 30px',
            letterSpacing: '.05em',
            pointerEvents: 'none',
            cursor: 'default',
            fontSize: '.6875rem',
            textTransform: 'uppercase',
            color: '#cedce4',
            fontWeight: 700,
            textAlign: 'left',
            display: 'block',
          }}
        >
          NAVIGATION
        </span>
        {firstNavItems}
        <span
          style={{
            padding: '12px 30px',
            letterSpacing: '.05em',
            pointerEvents: 'none',
            cursor: 'default',
            fontSize: '.6875rem',
            textTransform: 'uppercase',
            color: '#cedce4',
            fontWeight: 700,
            textAlign: 'left',
            display: 'block',
          }}
        >
          ACCOUNT
        </span>
        {secondNavItems}
      </>
    )
  }, [pathname])

  return (
    <>
      <Hidden smDown>
        <Drawer
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              justifyContent: 'space-between',
              transition: theme.transitions.create(['width'], {
                duration: theme.transitions.duration.standard,
              }),
              background: theme.palette.primary.main,
            },
            '&.collapsed .MuiDrawer-paper': {
              width: 56,
              overflow: 'hidden',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box>
            <LogoIcon width="260px" height="70px" />
            <List>{navItems}</List>
          </Box>
        </Drawer>
      </Hidden>

      <Hidden mdUp>
        <Drawer
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              justifyContent: 'space-between',
              transition: theme.transitions.create(['width'], {
                duration: theme.transitions.duration.standard,
              }),
              background: theme.palette.primary.main,
              marginTop: '70px',
            },
            '&.collapsed .MuiDrawer-paper': {
              width: 56,
              overflow: 'hidden',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Box>
            <List>{navItems}</List>
          </Box>
        </Drawer>
      </Hidden>
    </>
  )
}

export default Sidebar
