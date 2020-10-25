import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import UserRoutes from '../config/User/UserRoutes'
import AdminRoutes from '../config/Admin/AdminRoutes'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <>
        <UserRoutes />
        <AdminRoutes />
        </>
      </Switch>
    </Router>
  )
}

export default Routes