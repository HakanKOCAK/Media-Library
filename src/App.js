import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Files from './components/files/Files'
import FileDetails from './components/files/FileDetails'

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
              <Route exact path="/files" component={Files} />
              <Route path="/files/:id" component={FileDetails} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;