import { ZitadelConfig, createZitadelAuth } from '@zitadel/react'
import { User } from 'oidc-client-ts'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type AuthContextType = {
  authenticated: boolean | null
  userInfo: User | null
  token: string
  signin: () => void
  signout: () => void
  signinRedirectCallback: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [token, setToken] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const config: ZitadelConfig = {
    authority: 'http://prolancer-authentication-ebcf8a4aae1e.herokuapp.com/',
    client_id: '275389987892098434@prolancer',
    redirect_uri: 'http://localhost:5173/callback',
    post_logout_redirect_uri: 'http://localhost:5173/signin',
    project_resource_id: '274633502618575146',
  }

  const zitadel = createZitadelAuth(config)

  const signin = () => {
    zitadel.authorize()
  }

  const signout = () => {
    zitadel.signout()
  }

  const signinRedirectCallback = () => {
    zitadel.userManager
      .signinRedirectCallback()
      .then((user: User) => {
        if (user) {
          setAuthenticated(true)
          setUserInfo(user)
        } else {
          setAuthenticated(false)
        }
      })
      .catch((error: any) => {
        console.log('error: ', error)
        setAuthenticated(false)
      })
  }

  useEffect(() => {
    zitadel.userManager
      .getUser()
      .then((user) => {
        if (user) {
          setAuthenticated(true)
          setUserInfo(user)
          setToken(user.access_token)
        } else {
          zitadel.authorize()
          setAuthenticated(false)
        }
      })
      .catch((error: any) => {
        console.log('error: ', error)
        zitadel.authorize()
        setAuthenticated(false)
      })
  }, [zitadel])

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        userInfo,
        token,
        signin,
        signout,
        signinRedirectCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
