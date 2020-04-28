import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Auth from './auth/Auth';
import Routes from './components/routing/Routes';

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
            <Route component={Routes} />
          </Switch>
        </Router>
      </Auth>
    </Provider>
  )
}
export default App;