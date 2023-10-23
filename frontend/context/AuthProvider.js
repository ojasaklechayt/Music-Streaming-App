'use client'

import { AUTH_TOKEN_KEY } from "@/utils/constants"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthValueContext = createContext(null)
const AuthDispatchContext = createContext(null)

export const AuthProvider = ({ reqAuthToken, children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return reqAuthToken || Cookies.get(AUTH_TOKEN_KEY) || null
  })

  useEffect(() => {
    if (!authToken) {
      Cookies.remove(AUTH_TOKEN_KEY)
    } else {
      Cookies.set(AUTH_TOKEN_KEY, authToken)
    }
  }, [authToken])

  return (
    <AuthDispatchContext.Provider value={setAuthToken}>
      <AuthValueContext.Provider value={authToken}>
        {children}
      </AuthValueContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export default AuthProvider

export const useAuthToken = () => {
  const context = useContext(AuthValueContext)

  if (context === undefined) {
    throw new Error("useAuthToken must be used within AuthProvider")
  }

  return context
}

export const useSetAuthToken = () => {
  const context = useContext(AuthDispatchContext)

  if (context === undefined) {
    throw new Error("useSetAuthToken must be used within AuthProvider")
  }

  return context
}

export const useAuthValues = () => {
  const authToken = useContext(AuthValueContext)
  const setAuthToken = useContext(AuthDispatchContext)

  return useMemo(() => [authToken, setAuthToken], [authToken, setAuthToken])
}
