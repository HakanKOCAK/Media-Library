import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../Register';
import Login from '../Login';
import NoMatch from '../NoMatch';
import Files from '../files/Files'
import FileDetails from '../files/FileDetails'
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PropTypes from 'prop-types';

const Routes = (props) => {

  const { error } = props
  const { isOpen } = error
  return (
    <section className={`container ${isOpen ? 'blur' : ''}`}>
      <Switch>
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/files" component={Files} />
        <PrivateRoute exact path="/files/:id" component={FileDetails} />
        <Route exact path="/error-404" component={NoMatch} />
        <Redirect from="*" to='/error-404' />
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  error: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  })
}

Routes.defaultProps = {
  error: { isOpen: false }
}
const mapStateToProps = state => {
  return {
    error: state.error
  }
}
export default connect(mapStateToProps)(Routes);