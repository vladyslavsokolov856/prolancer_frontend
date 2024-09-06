import { userCurrentUser } from '@/hooks/useCurrentUser'
import User from '@/types/users'
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'

type UserAvatarMenuProps = {
  signout: () => void
}

const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({ signout }) => {
  const [anchorElMenu, setAnchorElMenu] = React.useState<HTMLElement | null>(
    null
  )
  const openMenu = Boolean(anchorElMenu)
  const { user } = userCurrentUser()

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  return (
    <Paper sx={{ background: 'transparent', flexGrow: 0 }} elevation={0}>
      <Button
        onClick={handleClickMenu}
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          p: 1,
          gap: 1,
        }}
      >
        <Avatar alt={(user as User)?.display_name} />
        <Box sx={{ pl: 0.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: '0.88rem' }}
          >
            {(user as User)?.display_name}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: '0.86rem', textAlign: 'start' }}
          >
            {(user as User)?.role}
          </Typography>
        </Box>
      </Button>
      <Menu
        id="user-menu"
        aria-labelledby="user-menu-button"
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={signout}>Sign out</MenuItem>
      </Menu>
    </Paper>
  )
}

export default UserAvatarMenu
