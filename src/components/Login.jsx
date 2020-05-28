import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Error from './Error';
import submitLogin from '../actions/login';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const config = {
    NO_ACCOUNT: false,
    USER_DISABLED: false,
    PASSWORD_LENGTH: false,
    EMAIL_FORMAT: false,
  };

  const [flags, setFlag] = useState(config);

  useEffect(() => {
    if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email) && email.length) {
      setFlag({ ...flags, EMAIL_FORMAT: true });
    } else {
      setFlag({ ...flags, EMAIL_FORMAT: false });
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 6 && password.length) {
      setFlag({ ...flags, PASSWORD_LENGTH: true });
    } else {
      setFlag({ ...flags, PASSWORD_LENGTH: false });
    }
  }, [password]);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      if (!value.includes(' ')) {
        setEmail(value);
      }
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  const onSubmit = async (event, submittedEmail, submittedPassword) => {
    event.preventDefault();
    dispatch(submitLogin(submittedEmail, submittedPassword)).then((response) => {
      if (response.error) {
        switch (response.error.code) {
          case 'auth/wrong-password':
            setFlag({
              ...flags,
              INCORRECT_PASSWORD: true,
              NO_ACCOUNT: true,
              USER_DISABLED: false,
            });
            break;
          case 'auth/user-not-found':
            setFlag({
              ...flags,
              NO_ACCOUNT: true,
              USER_DISABLED: false,
              INCORRECT_PASSWORD: true,
            });
            break;
          case 'auth/user-disabled':
            setFlag({
              ...flags,
              USER_DISABLED: true,
              NO_ACCOUNT: false,
              INCORRECT_PASSWORD: false,
            });
            break;
          default:
            setFlag(config);
            break;
        }
      }
    });
  };

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Sign Into Your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event, email, password)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            className={flags.EMAIL_FORMAT || flags.NO_ACCOUNT ? 'error' : ''}
            name="userEmail"
            value={email}
            onChange={(event) => onChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className={flags.INCORRECT_PASSWORD || flags.PASSWORD_LENGHT ? 'error' : ''}
            placeholder="Password"
            name="userPassword"
            minLength="6"
            value={password}
            onChange={(event) => onChange(event)}
          />
        </div>
        <Error flags={flags} />
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Do not have an account?
        <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
