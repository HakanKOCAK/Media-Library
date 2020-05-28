import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const PrivateRoute = ({
  component: Component,
  files,
  app,
  user,
  ...rest
}) => {
  const storeProps = { files, app, user };

  const result = (props) => {
    if (!app.userLoaded || !app.filesLoaded) {
      return <Spinner />;
    }
    if (!user.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (files.entities) {
      return <Component {...props} {...storeProps} />;
    }

    return <Spinner />;
  };

  return (
    <Route
      {...rest}
      render={(props) => result(props)}
    />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  app: PropTypes.shape({
    userLoaded: PropTypes.bool.isRequired,
    filesLoaded: PropTypes.bool.isRequired,
  }).isRequired,
  files: PropTypes.shape({
    entities: PropTypes.shape({}).isRequired,
  }).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
  files: state.files,
});

export default connect(mapStateToProps)(PrivateRoute);
