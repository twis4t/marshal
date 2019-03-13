import React from 'react'
import { Route, Switch } from 'react-router'

import MainLayout from '@/containers/layouts/main'
import App from '@/containers/App'
import Login from '@/containers/Login'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={MainLayout(App)} />
      <Route path="/login" component={Login} />
      <Route render={() => <div>Miss</div>} />
    </Switch>
  </div>
)

export default routes
