import React from 'react'
import { Route } from 'react-router-dom'
import { Home, Movies, MoviesDetail, Games, GamesDetail, Login, Register } from '../../pages/User'
import { Layouts } from '../../components'

const UserRoutes = () => {
  return (
    <>
      <Route exact path='/movies'>
        <Layouts>
          <Movies />
        </Layouts>
      </Route>
      <Route exact path='/movies/detail/:id'>
        <Layouts>
          <MoviesDetail />
        </Layouts>
      </Route>
      <Route exact path='/games'>
        <Layouts>
          <Games />
        </Layouts>
      </Route>
      <Route exact path='/games/detail/:id'>
        <Layouts>
          <GamesDetail />
        </Layouts>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route exact path='/'>
        <Layouts>
          <Home />
        </Layouts>
      </Route>
    </>
  )
}

export default UserRoutes