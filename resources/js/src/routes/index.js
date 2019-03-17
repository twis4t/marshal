import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import createPrivateRoute from './PrivateRoute'
import MainLayout from '@/containers/layouts/main'
import App from '@/containers/App'
import Login from '@/containers/Login'
import Shops from '@/containers/Shops'

const routes = (
  <HashRouter>
    <Switch>
      <Route
        exact
        path="/"
        {...createPrivateRoute({
          component: MainLayout(App),
        })}
      />
      <Route
        exact
        path="/shops"
        {...createPrivateRoute({
          component: MainLayout(Shops),
        })}
      />
      <Route path="/login" component={Login} />
      <Route render={() => <div>Miss</div>} />
    </Switch>
  </HashRouter>
)

export default routes
