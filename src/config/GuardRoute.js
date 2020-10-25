import React from 'react'
import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const GuardRoute = ({children, ...rest}) => {
  const [user] = useContext(AuthContext)

  return (
    <Route {...rest}>
      {user ? children : <Redirect to='/login' />}
    </Route>
  )
}

export default GuardRoute