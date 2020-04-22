import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux';
import { submitLogin } from '../actions/login';

const Login = ({ isAuthenticated }) => {
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

    //Redirect if Logged in 
    if (isAuthenticated) {
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

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {})(Login)