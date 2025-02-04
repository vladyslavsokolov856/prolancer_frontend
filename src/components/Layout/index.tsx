import Appbar from '@/components/Layout/Appbar'
import Footer from '@/components/Layout/Footer'
import routesConfig from '@/config/routes'
import { matchRoutes, renderMatches, useLocation, Navigate } from 'react-router'
import { Suspense, useContext, useEffect, useMemo, useState } from 'react'
import layoutConfig from '@/config/layout'
import { Box, useTheme, Container, CircularProgress } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { AuthContext, AuthContextType } from '@/context/auth'

const Layout: React.FC = () => {
  const location = useLocation()
  const theme = useTheme()
  const { authenticated } = useContext(AuthContext) as AuthContextType

  const matches = useMemo(() => {
    return matchRoutes(routesConfig, location)
  }, [location])

  const label = matches![0].route.label || ''

  const [
    {
      route: { settings },
    },
  ]: any = matches || [{}]

  const [layout, setLayout] = useState(layoutConfig.default)
  const [__, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (settings && settings.layout) {
      setLayout((layout) => ({ ...layout, ...settings.layout }))
    } else {
      setLayout(layoutConfig.default)
    }
  }, [settings])

  return (
    <>
      {authenticated === true && (
        <Suspense fallback="loading">
          <div>
            <Box
              component="main"
              display="flex"
              sx={{
                bgcolor: '#fafbfe',
                height: '100vh',
                overflow: 'auto',
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
                <Helmet>
                  <title>Prolancer - {label}</title>
                </Helmet>
                <Container>{renderMatches(matches)}</Container>
              </Box>
              {layout.footer && <Footer />}
            </Box>
          </div>
        </Suspense>
      )}
      {authenticated === null && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: 'calc(100vh - 100px)' }}
        >
          <CircularProgress />
        </Box>
      )}
      {authenticated === false && <Navigate to="/signin" />}
    </>
  )
}

export default Layout
