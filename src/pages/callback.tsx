import { useContext, useEffect } from 'react'
import { AuthContext, AuthContextType } from '@/context/auth'

const Callback = () => {
  const { authenticated, userInfo, signinRedirectCallback, signout } =
    useContext(AuthContext) as AuthContextType

  useEffect(() => {
    if (authenticated === false) {
      signinRedirectCallback()
    }
  }, [authenticated, userInfo, signinRedirectCallback])

  if (authenticated === true && userInfo) {
    return (
      <div className="user">
        <h2>Welcome, {userInfo.profile.name}!</h2>
        <p className="description">Your ZITADEL Profile Information</p>
        <p>Name: {userInfo.profile.name}</p>
        <p>Email: {userInfo.profile.email}</p>
        <p>Email Verified: {userInfo.profile.email_verified ? 'Yes' : 'No'}</p>
        <p>
          Roles:{' '}
          {JSON.stringify(
            userInfo.profile['urn:zitadel:iam:org:project:roles']
          )}
        </p>

        <button onClick={signout}>Log out</button>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Callback
