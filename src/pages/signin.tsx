import { useContext } from 'react'
import { AuthContext, AuthContextType } from '@/context/auth'
import { Navigate } from "react-router";

const Signin = () => {
  const { signin, authenticated } = useContext(AuthContext) as AuthContextType

  return <>
    {authenticated === null && <div>Login Loading...</div>}
    {authenticated === false && signin()}
    {authenticated && <Navigate to="/" />}
  </>
}

export default Signin