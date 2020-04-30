import React, { Fragment, useState, useEffect } from 'react'
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
                flag = 3 user disabled
                flag = 4 password lenght is smaller than 6
                flag = 5 email format is not correct
        */

    const [flag, setFlag] = useState(0);

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email) && email.length) {
            setFlag(5)
        } else {
            setFlag(0)
        }
    }, [email])

    useEffect(() => {
        if (password.length < 6 && password.length) {
            setFlag(4);
        } else {
            setFlag(0);
        }
    }, [password])

    const onChange = event => {
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
            if (response.error) {
                switch (response.error.code) {
                    case 'auth/wrong-password':
                        setFlag(2);
                        break;
                    case 'auth/user-not-found':
                        setFlag(2);
                        break;
                    case 'auth/user-disabled':
                        setFlag(3);
                        break;
                    default:
                        setFlag(0);
                        break;
                }
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
                                flag === 1 || flag === 5
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
                        <div className="error-div">
                            {
                                flag === 5
                                    ?
                                    <p className="my-1">Wrong email format</p>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={
                                flag === 2 || flag === 4
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
                        <div className={`hint-div ${flag === 4 ? 'red' : ''}`}>
                            <p className="my-1">
                                Minimum password lenght is 6.
                            </p>
                        </div>
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
                        {
                            flag === 3
                                ?
                                <p className="my-1">
                                    Sorry, it seems like the account has been disabled by an administrator.
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