import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { logoutUser } from '../actions/user';

import '../styles/Navbar.css'

const Navbar = ({ user: { isAuthenticated, loading } }) => {
    const dispatch = useDispatch();

    const logout = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
    }
    const authLinks = (
        <ul>
            <li>
                <a onClick={event => logout(event)} href='/'>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span>Signout</span>
                </a>
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
                    <i className="fas fa-tape" /> Media Library
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