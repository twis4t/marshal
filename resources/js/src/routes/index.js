import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import createPrivateRoute from './PrivateRoute'
import MainLayout from '@/containers/layouts/main'
import App from '@/containers/App'
import Login from '@/containers/Login'
import Shops from '@/containers/Shops'
import Users from '@/containers/Users'
import Requests from '@/containers/Requests'
import Request from '@/containers/Request'
import Banners from '@/containers/Banners'
import RequestNotFound from '@/containers/RequestNotFound'
import Test from '@/components/Test'

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
        path="/shops"
        {...createPrivateRoute({
          component: MainLayout(Shops),
        })}
      />
      <Route
        path="/users"
        {...createPrivateRoute({
          component: MainLayout(Users),
        })}
      />
      <Route
        path="/requests"
        {...createPrivateRoute({
          component: MainLayout(Requests),
        })}
      />
      <Route
        path="/banners"
        {...createPrivateRoute({
          component: MainLayout(Banners),
        })}
      />
      <Route
        path="/request/:id"
        {...createPrivateRoute({
          component: MainLayout(Request),
        })}
      />
      <Route
        path="/request-not-found"
        {...createPrivateRoute({
          component: MainLayout(RequestNotFound),
        })}
      />
      <Route path="/login" component={Login} />
      <Route path="/test" component={Test} />
      <Route render={() => <div>Miss</div>} />
    </Switch>
  </HashRouter>
)

export default routes
