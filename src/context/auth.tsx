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
  authority: import.meta.env.VITE_ZITADEL_AUTHORITY,
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_ZITADEL_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.VITE_ZITADEL_POST_LOGOUT_REDIRECT_URI,
  project_resource_id: import.meta.env.VITE_ZITADEL_PROJECT_RESOURCE_ID,
}

const zitadel = createZitadelAuth(zitadelConfig)

const zitadelDatakey = `oidc.user:${zitadelConfig.authority}:${zitadelConfig.client_id}`;

const localStorageUserInfo = localStorage.getItem(zitadelDatakey);
const localStorageParsedUserInfo = Boolean(localStorageUserInfo) ? JSON.parse(localStorageUserInfo!) : null;

configAxios(localStorageParsedUserInfo);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(localStorageParsedUserInfo)
  const [authenticated, setAuthenticated] = useState<boolean | null>(Boolean(localStorageUserInfo) ? true : null)

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
  }, [zitadel, authenticated, configAxios, loginCallback, logoutCallback]);

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
