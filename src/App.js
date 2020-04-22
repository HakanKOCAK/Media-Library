import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './auth/Auth';
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
      <Auth>
        <Router>
          <Route exact path="/" component={Landing} />
          <Switch >
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/files" component={Files} />
            <Route path="/files/:id" component={FileDetails} />
          </Switch>
        </Router>
      </Auth>
    </Provider>
  )
}
export default App;