import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { submitRegister } from '../actions/register';

const Register = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoggedin, setStatus] = useState()
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const token = localStorage.getItem('medialibrary.user.token') || success;

        setStatus(token);
    }, [success])

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
            dispatch(submitRegister(email, password)).then(response => {
                setSuccess(response.success);
                setError(response.error);
            });
        } else {
            console.log('passwords do not match')
        }

    }

    if (isLoggedin) {
        return <Redirect to='/files' />
    }

    return (
        <Fragment>
            <section >
                <h1 >Sign Up</h1>
                <p ><i className="fas fa-user"></i> Create Your Account</p>
                <form onSubmit={event => onSubmit(event, email, password, password2)}>
                    <div >
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={email}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="userPassword"
                            value={password}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <div >
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="userPassword2"
                            value={password2}
                            onChange={event => onChange(event)}
                        />
                    </div>
                    <input type="submit" value="Register" />
                </form>
                <p>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({

})

export default Register