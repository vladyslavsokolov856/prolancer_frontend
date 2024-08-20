import { AuthContext, AuthContextType } from '@/context/auth'
import { useContext, useEffect } from 'react'

const Login = () => {
  const { authenticated, signin } = useContext(AuthContext) as AuthContextType

  useEffect(() => {
    authenticated === false && signin()
  }, [authenticated, signin])

  return <div></div>
}

export default Login
