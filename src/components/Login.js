import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from '../actions/login';

const Login = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const login = useSelector(({ login }) => login.success);
    const token = localStorage.getItem('medialibrary.user.token') || login || "";

    const onChange = event => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
    }

    const onSubmit = async (event, email, password) => {
        event.preventDefault();
        dispatch(submitLogin(email, password));
    }

    //Redirect if Logged in 
    if (token) {
        return <Redirect to='/files' />
    }

    return (
        <Fragment>
            <section >
                <h1 >Sign In</h1>
                <p><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form onSubmit={event => onSubmit(event, email, password)}>
                    <div >
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={email}
                            onChange={event => onChange(event)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="userPassword"
                            minLength="6"
                            value={password}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <input type="submit" value="Sign In" />
                </form>
                <p >
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Login