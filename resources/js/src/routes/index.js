import React from 'react'
import { Route, Switch } from 'react-router'

import App from '@/containers/App'
import Login from '@/components/Login'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route render={() => <div>Miss</div>} />
    </Switch>
  </div>
)

export default routes
