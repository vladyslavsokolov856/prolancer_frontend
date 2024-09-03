import { useContext } from 'react'
import { AuthContext, AuthContextType } from '@/context/auth'
import { Navigate } from 'react-router'
import { CircularProgress, Box } from '@mui/material'

const Signin = () => {
  const { signin, authenticated } = useContext(AuthContext) as AuthContextType

  return (
    <>
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
      {authenticated === false && signin()}
      {authenticated && <Navigate to="/" />}
    </>
  )
}

export default Signin
