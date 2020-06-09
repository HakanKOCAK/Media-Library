import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Register from '../Register';
import Login from '../Login';
import Profile from '../Profile';
import NoMatch from '../NoMatch';
import Files from '../files/Files';
import FileDetails from '../files/FileDetails';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes = (props) => {
  const { dialog } = props;
  const { isOpen } = dialog;
  return (
    <div className={`container ${isOpen ? 'blur' : ''}`} role="document" aria-hidden={isOpen}>
      <Switch>
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/files" component={Files} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/files/:id" component={FileDetails} />
        <Route exact path="/error-404" component={NoMatch} />
        <Redirect from="*" to="/error-404" />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  dialog: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }),
};

Routes.defaultProps = {
  dialog: { isOpen: false },
};

const mapStateToProps = (state) => ({
  dialog: state.dialog,
});

export default connect(mapStateToProps)(Routes);
