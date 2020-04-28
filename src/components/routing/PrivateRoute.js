import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const PrivateRoute = ({
    component: Component,
    user: { isAuthenticated, loading },
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <Spinner />
                ) : isAuthenticated ? (
                    <Component {...props} />
                ) : (
                            <Redirect to="/" />
                        )
            }
        />
    );

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);