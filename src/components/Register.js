import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { submitRegister } from '../actions/register';

const Register = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const config = {
        PASSWORDS_DO_NOT_MATCH: false,
        PASSWORD_LENGHT: false,
        USER_EXIST: false,
        EMAIL_FORMAT: false
    }

    const errorMessages = {
        PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
        PASSWORD_LENGHT: 'Minimum password lenght is 6.',
        EMAIL_FORMAT: 'Wrong email format.',
        USER_EXIST: 'User already exist.'
    }


    const [flags, setFlag] = useState(config);

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
            setFlag({ ...flags, EMAIL_FORMAT: true })
        } else {
            setFlag({ ...flags, EMAIL_FORMAT: false })
        }
    }, [email])

    useEffect(() => {
        if (password.length < 6) {
            setFlag({ ...flags, PASSWORD_LENGHT: true })
        } else {
            setFlag({ ...flags, PASSWORD_LENGHT: false });
        }
    }, [password])

    useEffect(() => {
        if (password2 !== password) {
            setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: true })
        } else {
            setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: false });
        }
    }, [password2])

    const onChange = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'userEmail':
                if (!value.includes(' ')) {
                    setEmail(value);
                }
                break;
            case 'userPassword':
                setPassword(value);
                break;
            case 'userPassword2':
                setPassword2(value);
                break;
        }
    }

    const onSubmit = async (event, email, password, password2) => {
        event.preventDefault()

        if (password === password2) {
            dispatch(submitRegister(email, password)).then(response => {
                if (response.error.code === 'auth/email-already-in-use') {
                    setFlag({ ...flags, USER_EXIST: true })
                }
            })
        } else {
            setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: true });
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
                            className={flags.USER_EXIST || flags.EMAIL_FORMAT ? 'error' : ''}
                            value={email}
                            onChange={event => onChange(event)
                            }
                            required
                        />
                        <div className="error-div">
                            {
                                flags.EMAIL_FORMAT ? <p className="my-1">{errorMessages.EMAIL_FORMAT}</p> : null
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="userPassword"
                            className={flags.PASSWORDS_DO_NOT_MATCH ? 'error' : ''}
                            value={password}
                            onChange={event => onChange(event)}
                            minLength='6'
                            required
                        />
                        <div className={`hint-div ${flags.PASSWORD_LENGHT ? 'red' : ''}`}>
                            <p className="my-1">
                                {errorMessages.PASSWORD_LENGHT}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="userPassword2"
                            className={flags.PASSWORDS_DO_NOT_MATCH ? 'error' : ''}
                            value={password2}
                            onChange={event => onChange(event)}
                            required
                        />
                    </div>
                    <div className="error-div">
                        {
                            flags.PASSWORDS_DO_NOT_MATCH ? <p className="my-1">{errorMessages.PASSWORDS_DO_NOT_MATCH}</p> : null
                        }
                        {
                            flags.USER_EXIST ? <p className="my-1">{errorMessages.USER_EXIST}</p> : null
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