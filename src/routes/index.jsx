import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import { auth } from '../services/firebase/firebase'
import { history } from './history'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'

const Chat = lazy(() => import('../component/Chat'))
const Login = lazy(() => import('../component/Login'))
const Signup = lazy(() => import('../component/Signup'))
const Home = lazy(() => import('../component/Home'))
const ChatRoom = lazy(() => import('../component/ChatRoom'))

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authenticated) {
      history.push('/chat')
    } else {
      history.push('/')
    }
  }, [authenticated])

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  }, [window.location])

  return (
    <Suspense fallback={<>Loading ... </>}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/chat"
            authenticated={authenticated}
            component={Chat}
          ></Route>
          <Route
            exact
            path="/signup"
            authenticated={authenticated}
            component={Signup}
          ></Route>
          <Route
            exact
            path="/login"
            authenticated={authenticated}
            component={Login}
          ></Route>
          <Route
            exact
            path="/rooms/:roomId"
            authenticated={authenticated}
            component={ChatRoom}
          ></Route>
          <Route exact path="/" component={Home}></Route>
          <Redirect to="/" component={Home} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default Routes
