import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { submitRegister } from '../actions/register';

const Register = ({ isAuthenticated }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const onChange = event => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        } else if (name === 'userPassword') {
            setPassword(value);
        } else if (name === 'userPassword2') {
            setPassword2(value);
        }
    }

    const onSubmit = async (event, email, password, password2) => {
        event.preventDefault()

        if (password === password2) {
            dispatch(submitRegister(email, password))
        } else {
            console.log('passwords do not match')
        }

    }

    if (isAuthenticated) {
        return <Redirect to='/files' />
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={event => onSubmit(event, email, password, password2)}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={email}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="userPassword"
                            value={password}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="userPassword2"
                            value={password2}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <input className="btn btn-primary" type="submit" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {})(Register)