import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTape, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from '../actions/user';

import '../styles/Navbar.css'

const Navbar = ({ user: { isAuthenticated } }) => {
    const dispatch = useDispatch();
    const logout = (event) => {
        event.preventDefault();
        logoutUser()(dispatch);
    }

    const location = useLocation()

    if (location.pathname === '/error-404') {
        return null;
    }

    const authLinks = (
        <>
            <li>
                <Link to='/' onClick={event => logout(event)}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> {' '}
                    <span>Signout</span>
                </Link>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link to="/register">Sign Up</Link>
            </li>
            <li>
                <Link to="/login">Sign In</Link>
            </li>
        </>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <FontAwesomeIcon icon={faTape} /> Media Library
                </Link>
            </h1>
            {<ul>{isAuthenticated ? authLinks : guestLinks}</ul>}
        </nav>
    )
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
    user: state.user
})

export default connect(mapStateToProp)(Navbar)