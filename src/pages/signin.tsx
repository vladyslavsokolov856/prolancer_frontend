import { useContext } from 'react'
import { AuthContext, AuthContextType } from '@/context/auth'
import { Navigate } from 'react-router'
import { CircularProgress } from '@mui/material'

const Signin = () => {
  const { signin, authenticated } = useContext(AuthContext) as AuthContextType

  return (
    <>
      {authenticated === null && <CircularProgress />}
      {authenticated === false && signin()}
      {authenticated && <Navigate to="/" />}
    </>
  )
}

export default Signin
