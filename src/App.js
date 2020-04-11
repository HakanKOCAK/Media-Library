import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'

//Redux
import { Provider } from 'react-redux'
import store from './store'

import './App.css';

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <section>
            <Switch >
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;