import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Routes from './components/routing/Routes';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/user';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch >
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  )
}
export default App;