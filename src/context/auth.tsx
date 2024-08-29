import { ReactNode, createContext, useEffect, useState } from 'react'
import { ZitadelConfig, createZitadelAuth } from '@zitadel/react'
import { User } from 'oidc-client-ts'
import { configAxios } from '@/services/axios'

export type AuthContextType = {
  authenticated: boolean | null
  userInfo: User | null
  signin: () => void
  signout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export const zitadelConfig: ZitadelConfig = {
  authority: 'http://prolancer-authentication-ebcf8a4aae1e.herokuapp.com/',
  client_id: '275389987892098434@prolancer',
  redirect_uri: 'http://localhost:5173/callback',
  post_logout_redirect_uri: 'http://localhost:5173/signin',
  project_resource_id: '274633502618575146',
}

const zitadelDatakey = `oidc.user:${zitadelConfig.authority}:${zitadelConfig.client_id}`;

const localStorageUserInfo = localStorage.getItem(zitadelDatakey);
export const localStorageParsedUserInfo = Boolean(localStorageUserInfo) ? JSON.parse(localStorageUserInfo!) : null;

configAxios(localStorageParsedUserInfo);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(localStorageParsedUserInfo)
  const [authenticated, setAuthenticated] = useState<boolean | null>(Boolean(localStorageUserInfo) ? true : null)

  const zitadel = createZitadelAuth(zitadelConfig)

  const signin = () => {
    zitadel.authorize()
  }

  const signout = () => {
    zitadel.signout()
  }

  const loginCallback = (user: User) => {
    setAuthenticated(true);
    setUserInfo(user);
    configAxios(user);
  };

  const logoutCallback = () => {
    setAuthenticated(false);
    setUserInfo(null);
    localStorage.removeItem(zitadelDatakey);
    configAxios(null);
  };

  useEffect(() => {
    if (authenticated === null) {
      zitadel.userManager
        .signinRedirectCallback()
        .then((user: User) => {
          if (user) {
            loginCallback(user);
          } else {
            logoutCallback();
          }
        })
        .catch(() => {
          logoutCallback();
        });
    }
    if (authenticated === true && userInfo === null) {
      zitadel.userManager
        .getUser()
        .then((user) => {
          if (user) {
            loginCallback(user);
          } else {
            logoutCallback();
          }
        })
        .catch(() => {
          logoutCallback();
        });
    }
  }, [authenticated, setAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        userInfo,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
