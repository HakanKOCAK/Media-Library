import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Routes from './components/routing/Routes';
import ErrorNotification from './components/ErrorNotification';
import { loadUser, removeUserData } from './actions/user';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const timeout = 1000 * 60 * 24;
  const idleTimer = useRef(null);
  const [isTimedOut, setTimedOut] = useState(false);

  useEffect(() => {
    loadUser()(dispatch);
  });

  useEffect(() => {
    if (isTimedOut) {
      removeUserData()(dispatch);
    }
  }, [isTimedOut, dispatch]);

  const onActive = () => {
    setTimedOut(false);
  };

  const onIdle = () => {
    setTimedOut(true);
  };

  const onAction = () => {
    setTimedOut(false);
  };

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={timeout}
      />
      <Router>
        <Navbar />
        <ErrorNotification />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
