import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = props => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const iniateUser = currentUser ? currentUser : null
  const [user, setUser] = useState(iniateUser)

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  )
}