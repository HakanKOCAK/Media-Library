import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Routes from './components/routing/Routes';
import { loadUser } from './actions/user';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser()(dispatch);
  })

  return (
    <Router>
      <Navbar />
      <Switch >
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Router>
  )
}
export default App;