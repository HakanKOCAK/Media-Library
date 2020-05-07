import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const PrivateRoute = ({
    component: Component,
    app: { userLoaded, filesLoaded },
    files: { entities },
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
                            <Redirect to="/" />
                        )
                        :
                        entities
                            ?
                            (
                                <Component {...props} files={entities} />
                            )
                            :
                            (
                                <Spinner />
                            )
            }
        />
    );

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    component: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    app: state.app,
    files: state.files
});

export default connect(mapStateToProps)(PrivateRoute);