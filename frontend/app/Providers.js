'use-client'

import AuthProvider from '../context/AuthProvider'

const Providers = ({ reqAuthToken, children }) => {
  return (
    <AuthProvider reqAuthToken={reqAuthToken}>
      {children}
    </AuthProvider>
  )
}

export default Providers
