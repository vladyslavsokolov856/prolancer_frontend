import Sidebar from '@/components/Layout/Sidebar'
import Appbar from '@/components/Layout/Appbar'
import Footer from '@/components/Layout/Footer'
import routesConfig from '@/config/routes'
import { matchRoutes, renderMatches, useLocation } from 'react-router'
import { Suspense, useEffect, useMemo, useState } from 'react'
import layoutConfig from '@/config/layout'
import { Box, useTheme, Container } from '@mui/material'

const Layout: React.FC = () => {
  const location = useLocation()
  const theme = useTheme()

  const matches = useMemo(() => {
    return matchRoutes(routesConfig, location)
  }, [location])

  const [
    {
      route: { settings },
    },
  ]: any = matches || [{}]

  const [layout, setLayout] = useState(layoutConfig.default)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (settings && settings.layout) {
      setLayout((layout) => ({ ...layout, ...settings.layout }))
    } else {
      setLayout(layoutConfig.default)
    }
  }, [settings])

  return (
    <Suspense fallback="loading">
      <div>
        {layout.sidebar && <Sidebar open={open} />}
        <Box
          component="main"
          display="flex"
          sx={{
            bgcolor: '#fafbfe',
            height: '100vh',
            overflow: 'auto',
            marginLeft: layout.sidebar ? '260px' : '0px',
            transition: theme.transitions.create(['marginLeft'], {
              duration: theme.transitions.duration.standard,
            }),
            [theme.breakpoints.down('sm')]: {
              margin: 0,
            },
            flexDirection: 'column',
          }}
        >
          {layout.toolbar && <Appbar setOpen={setOpen} />}
          <Box
            sx={{
              width: '100%',
              paddingLeft: '12px',
              paddingRight: '12px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '20px',
            }}
          >
            <Container>{renderMatches(matches)}</Container>
          </Box>
          {layout.footer && <Footer />}
        </Box>
      </div>
    </Suspense>
  )
}

export default Layout
