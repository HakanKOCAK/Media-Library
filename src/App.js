import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Auth from './auth/Auth';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Files from './components/files/Files'
import FileDetails from './components/files/FileDetails'
import NoMatch from './components/NoMatch'

//Redux
import { Provider } from 'react-redux'
import store from './store'

import './App.css';

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <Provider store={store}>
      <Auth>
        <Router>
          <Navbar />
          <Switch >
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/files" component={Files} />
            <Route path="/files/:id" component={FileDetails} />
            <Route exact path="/error-404" component={NoMatch} />
            <Redirect from="*" to='/error-404' />
          </Switch>
        </Router>
      </Auth>
    </Provider>
  )
}
export default App;