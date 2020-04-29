import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { submitLogin } from '../actions/login';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /*
                flag = 1 no account with given email
                flag = 2 inccorrect password
        */

    const [flag, setFlag] = useState(0);

    const onChange = event => {
        setFlag(0);
        const { name, value } = event.currentTarget;

        if (!value.includes(' ')) {
            if (name === 'userEmail') {
                setEmail(value);
            }
            else if (name === 'userPassword') {
                setPassword(value);
            }
        }
    }

    const onSubmit = async (event, email, password) => {
        event.preventDefault();
        dispatch(submitLogin(email, password)).then(response => {
            if (response.error && response.error.code === 'auth/wrong-password') {
                setFlag(2);
            } else if (response.error && response.error.code === 'auth/user-not-found') {
                setFlag(1);
            }
        })
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
                            className={
                                flag === 1
                                    ?
                                    'error'
                                    :
                                    ''
                            }
                            name="userEmail"
                            value={email}
                            onChange={event => onChange(event)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={
                                flag === 2
                                    ?
                                    'error'
                                    :
                                    ''
                            }
                            placeholder="Password"
                            name="userPassword"
                            minLength="6"
                            value={password}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <div className='error-div'>
                        {
                            flag === 1
                                ?
                                <p className="my-1">
                                    User Not Found. Please check your email.
                                </p>
                                :
                                null
                        }
                        {
                            flag === 2
                                ?
                                <p className="my-1">
                                    Invalid Password.
                                </p>
                                :
                                null
                        }

                    </div>
                    <input type="submit" className="btn btn-primary" value="Sign In" />
                </form>
                <p className="my-1">
                    Do not have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Login