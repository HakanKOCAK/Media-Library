import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const PublicRoute = ({
    component: Component,
    user: { isAuthenticated, loading },
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <Spinner />
                ) : !isAuthenticated ? (
                    <Component {...props} />
                ) : (
                            <Redirect to="/files" />
                        )
            }
        />
    );

PublicRoute.propTypes = {
    user: PropTypes.object.isRequired,
    component: PropTypes.element.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PublicRoute);