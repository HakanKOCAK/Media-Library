import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const PublicRoute = ({
    component: Component,
    app: { userLoaded, filesLoaded },
    user: { isAuthenticated },
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                !userLoaded || !filesLoaded
                    ?
                    (
                        <Spinner />
                    )
                    :
                    !isAuthenticated
                        ?
                        (
                            <Component {...props} />
                        )
                        :
                        (
                            <Redirect to="/files" />
                        )
            }
        />
    );

PublicRoute.propTypes = {
    user: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired
    }),
    app: PropTypes.shape({
        userLoaded: PropTypes.bool.isRequired,
        filesLoaded: PropTypes.bool.isRequired
    }),
    component: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.node
    ])
};

const mapStateToProps = state => ({
    user: state.user,
    app: state.app
});

export default connect(mapStateToProps)(PublicRoute);