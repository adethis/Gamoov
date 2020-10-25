import React from 'react'
import GuardRoute from '../GuardRoute'
import { Dashboard, Movies, MoviesForm, Games, GamesForm, Profile } from '../../pages/Admin'
import { LayoutsAdmin } from '../../components'

const AdminRoutes = () => {
  return (
    <>
      <GuardRoute exact path='/movies_editor'>
        <LayoutsAdmin>
          <Movies />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/movies_editor/add'>
        <LayoutsAdmin>
          <MoviesForm />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/movies_editor/edit/:id'>
        <LayoutsAdmin>
          <MoviesForm />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/games_editor'>
        <LayoutsAdmin>
          <Games />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/games_editor/add'>
        <LayoutsAdmin>
          <GamesForm />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/games_editor/edit/:id'>
        <LayoutsAdmin>
          <GamesForm />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/profile'>
        <LayoutsAdmin>
          <Profile />
        </LayoutsAdmin>
      </GuardRoute>
      <GuardRoute exact path='/dashboard'>
        <LayoutsAdmin>
          <Dashboard />
        </LayoutsAdmin>
      </GuardRoute>
    </>
  )
}

export default AdminRoutes