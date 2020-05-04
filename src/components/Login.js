import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { submitLogin } from '../actions/login';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const config = {
        NO_ACCOUNT: false,
        USER_DISABLED: false,
        PASSWORD_LENGHT: false,
        EMAIL_FORMAT: false
    }

    const errorMessages = {
        NO_ACCOUNT: 'User Not Found. Please check your credentials.',
        USER_DISABLED: 'Sorry, it seems like the account has been disabled by an administrator.',
        PASSWORD_LENGHT: 'Minimum password lenght is 6.',
        EMAIL_FORMAT: 'Wrong email format.'
    }

    const [flags, setFlag] = useState(config);

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email) && email.length) {
            setFlag({ ...flags, EMAIL_FORMAT: true })
        } else {
            setFlag({ ...flags, EMAIL_FORMAT: false })
        }
    }, [email])

    useEffect(() => {
        if (password.length < 6 && password.length) {
            setFlag({ ...flags, PASSWORD_LENGHT: true });
        } else {
            setFlag({ ...flags, PASSWORD_LENGHT: false });
        }
    }, [password])

    const onChange = event => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail') {
            if (!value.includes(' ')) {
                setEmail(value);
            }
        } else if (name === 'userPassword') {
            setPassword(value);
        }

    }

    const onSubmit = async (event, email, password) => {
        event.preventDefault();
        dispatch(submitLogin(email, password)).then(response => {
            if (response.error) {
                switch (response.error.code) {
                    case 'auth/wrong-password':
                        setFlag({ ...flags, INCORRECT_PASSWORD: true, NO_ACCOUNT: true });
                        break;
                    case 'auth/user-not-found':
                        setFlag({ ...flags, NO_ACCOUNT: true, USER_DISABLED: false });
                        break;
                    case 'auth/user-disabled':
                        setFlag({ ...flags, USER_DISABLED: true, NO_ACCOUNT: false });
                        break;
                    default:
                        setFlag(config);
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
                            className={flags.EMAIL_FORMAT || flags.NO_ACCOUNT ? 'error' : ''}
                            name="userEmail"
                            value={email}
                            onChange={event => onChange(event)}
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
                            className={flags.INCORRECT_PASSWORD || flags.PASSWORD_LENGHT ? 'error' : ''}
                            placeholder="Password"
                            name="userPassword"
                            minLength="6"
                            value={password}
                            onChange={event => onChange(event)}
                        />
                        <div className={`hint-div ${flags.PASSWORD_LENGHT ? 'red' : ''}`}>
                            <p className="my-1">
                                {errorMessages.PASSWORD_LENGHT}
                            </p>
                        </div>
                    </div>
                    <div className='error-div'>
                        {
                            flags.NO_ACCOUNT ? <p className="my-1">{errorMessages.NO_ACCOUNT}</p> : null
                        }
                        {
                            flags.USER_DISABLED ? <p className="my-1">{errorMessages.USER_DISABLED}</p> : null
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