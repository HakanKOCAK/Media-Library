import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const PublicRoute = ({
  component: Component,
  app: { userLoaded },
  user: { isAuthenticated },
  ...rest
}) => {

  const result = (props) => {
    if (!userLoaded) {
      return <Spinner />;
    }

    if (!isAuthenticated) {
      return <Component {...props} />;
    }

    return <Redirect to="/files" />;
  };

  return (
    <Route
      {...rest}
      render={(props) => result(props)}
    />
  );
};

PublicRoute.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  app: PropTypes.shape({
    userLoaded: PropTypes.bool.isRequired,
  }).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
});

export default connect(mapStateToProps)(PublicRoute);
