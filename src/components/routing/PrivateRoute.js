import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    user: { isAuthenticated, loading },
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <div>loading...</div>
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