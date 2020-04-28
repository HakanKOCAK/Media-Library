import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { submitLogin } from '../actions/login';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        dispatch(submitLogin(email, password))
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form className="form" onSubmit={event => onSubmit(event, email, password)}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={email}
                            onChange={event => onChange(event)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="userPassword"
                            minLength="6"
                            value={password}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Sign In" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Login