import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { submitRegister } from '../actions/register';

import '../styles/Register.css';

const Register = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    /*
            flag 1 = passwords do not match
            flag 2 = password lenght is smaller than 6
            flag 3 = user already exist
            flag 4 = email format is not correct
        */
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
            setFlag(4)
        } else {
            setFlag(0)
        }
    }, [email])

    useEffect(() => {
        if (password.length < 6) {
            setFlag(2);
        } else {
            setFlag(0);
        }
    }, [password])

    useEffect(() => {
        if (password2 !== password) {
            setFlag(1);
        } else {
            setFlag(0);
        }
    }, [password2])

    const onChange = event => {
        const { name, value } = event.currentTarget;

        if (!value.includes(' ')) {
            switch (name) {
                case 'userEmail':
                    setEmail(value);
                    break;
                case 'userPassword':
                    setPassword(value);
                    break;
                case 'userPassword2':
                    setPassword2(value);
                    break;
            }
        }
    }

    const onSubmit = async (event, email, password, password2) => {
        event.preventDefault()

        if (password === password2) {
            dispatch(submitRegister(email, password)).then(response => {
                if (response.error.code === 'auth/email-already-in-use') {
                    setFlag(3)
                }
            })
        } else {
            setFlag(1);
        }
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
                            className={
                                flag === 3 || flag === 4
                                    ?
                                    'error'
                                    :
                                    ''
                            }
                            value={email}
                            onChange={event => onChange(event)
                            }
                            required
                        />
                        <div className="error-div">
                            {
                                flag === 4
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
                            placeholder="Password"
                            name="userPassword"
                            className={
                                flag === 1
                                    ?
                                    'error'
                                    :
                                    ''
                            }
                            value={password}
                            onChange={event => onChange(event)}
                            required
                        />
                        <div className={`hint-div ${flag === 2 ? 'red' : ''}`}>
                            <p className="my-1">
                                Minimum password lenght is 6.
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="userPassword2"
                            className={
                                flag === 1
                                    ?
                                    'error'
                                    :
                                    ''
                            }
                            value={password2}
                            onChange={event => onChange(event)}
                            required
                        />
                    </div>
                    <div className="error-div">
                        {
                            flag === 1
                                ?
                                <p className="my-1">Passwords do not match</p>
                                :
                                null
                        }
                        {
                            flag === 3
                                ?
                                <p className="my-1">User already exist.</p>
                                :
                                null
                        }
                    </div>
                    <input className="btn btn-primary" type="submit" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment >
    )
}

export default Register