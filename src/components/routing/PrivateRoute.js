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
    const storeProps = { files, app, user }
    return (<Route
        {...rest}
        render={props =>
            !app.userLoaded || !app.filesLoaded
                ?
                (
                    <Spinner />
                )
                :
                !user.isAuthenticated
                    ?
                    (
                        <Redirect to="/" />
                    )
                    :
                    files.entities
                        ?
                        (
                            <Component {...props} {...storeProps} />
                        )
                        :
                        (
                            <Spinner />
                        )
        }
    />)
};

PrivateRoute.propTypes = {
    user: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        email: PropTypes.string.isRequired
    }),
    app: PropTypes.shape({
        userLoaded: PropTypes.bool.isRequired,
        filesLoaded: PropTypes.bool.isRequired
    }),
    files: PropTypes.shape({
        entities: PropTypes.shape({})
    }),
    component: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.node
    ])
};

const mapStateToProps = state => {
    return {
        user: state.user,
        app: state.app,
        files: state.files
    }
};

export default connect(mapStateToProps)(PrivateRoute);