import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Routes from './components/routing/Routes';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/user';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser()(dispatch);
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