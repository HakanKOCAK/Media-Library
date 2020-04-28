import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTape, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from '../actions/user';

import '../styles/Navbar.css'

const Navbar = ({ user: { isAuthenticated, loading } }) => {
    const dispatch = useDispatch();
    const logout = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
    }

    const location = useLocation()

    if (location.pathname === '/error-404') {
        return null;
    }

    const authLinks = (
        <ul>
            <li>
                <Link to='/' onClick={event => logout(event)}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> {' '}
                    <span>Signout</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Sign Up</Link>
            </li>
            <li>
                <Link to="/login">Sign In</Link>
            </li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <FontAwesomeIcon icon={faTape} /> Media Library
                </Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

const mapStateToProp = state => ({
    user: state.user
})

export default connect(mapStateToProp, {})(Navbar)