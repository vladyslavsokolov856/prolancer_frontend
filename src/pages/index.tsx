import React from 'react'
import {
    Box,
    Grid,
    Typography,
    ListItemIcon,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { navigationConfig } from '@/config/navigation'

interface NavItemProps {
    to: string
    label: string
    icon?: React.ElementType
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon: ItemIcon  }) => (
    <Grid item xs={12} sm={6} md={3}>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '300px', background: '#FFF' }}
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
            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, marginTop: '10px', marginBottom: '10px', color: 'rgb(1, 66, 194)' }}
                >
                    {label}
                </Typography>
            </Link>
        </Box>
    </Grid>
)

const Index: React.FC = () => {

    return (
        <Grid container spacing={2}>
            {navigationConfig.slice(2).map(({ label, to, icon: ItemIcon }) => (
                <NavItem key={to} to={to as string} label={label} icon={ItemIcon} />
            ))}
        </Grid>
    )
}

export default Index