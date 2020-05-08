import React, { Fragment, useState, useEffect } from 'react'
import Error from './Error';
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
        PASSWORD_LENGTH: false,
        USER_EXIST: false,
        EMAIL_FORMAT: false
    }

    const [flags, setFlag] = useState(config);

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
            setFlag({ ...flags, EMAIL_FORMAT: true, USER_EXIST: false })
        } else {
            setFlag({ ...flags, EMAIL_FORMAT: false, USER_EXIST: false })
        }
    }, [email])

    useEffect(() => {
        if (password.length < 6) {
            setFlag({ ...flags, PASSWORD_LENGTH: true })
        } else {
            setFlag({ ...flags, PASSWORD_LENGTH: false });
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
                <Error flags={flags} />
                <input className="btn btn-primary" type="submit" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment >
    )
}

export default Register