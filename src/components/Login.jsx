import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Error from './Error';
import submitLogin from '../actions/login';
import { emailCheck } from '../Utils/regExp';
import Spinner from './spinner/Spinner';

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
  const [onProgress, setProgress] = useState(false);

  useEffect(() => {
    if (!emailCheck(email) && email.length) {
      setFlag((prev) => ({ ...prev, EMAIL_FORMAT: true }));
    } else {
      setFlag((prev) => ({ ...prev, EMAIL_FORMAT: false }));
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 6 && password.length) {
      setFlag((prev) => ({ ...prev, PASSWORD_LENGTH: true }));
    } else {
      setFlag((prev) => ({ ...prev, PASSWORD_LENGTH: false }));
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
    setProgress(true);
    dispatch(submitLogin(submittedEmail, submittedPassword)).then((response) => {
      if (response.error) {
        setProgress(false);
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
    <div role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <h1 id="dialog-title" className="large text-primary">Sign In</h1>
      <p id="dialog-description" className="lead">
        <i className="fas fa-user" />
        Sign Into Your Account
      </p>
      <form className="form" onSubmit={(event) => (!onProgress ? onSubmit(event, email, password) : event.preventDefault())}>
        <div className="form-group">
          <input
            type="email"
            aria-label="Email Adress"
            aria-required="true"
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
            aria-label="Password"
            aria-required="true"
            className={flags.INCORRECT_PASSWORD || flags.PASSWORD_LENGHT ? 'error' : ''}
            placeholder="Password"
            name="userPassword"
            minLength="6"
            required
            value={password}
            onChange={(event) => onChange(event)}
          />
        </div>
        <Error flags={flags} />
        {
          !onProgress
            ? <input type="submit" className="btn btn-primary" value="Sign in" />
            : (
              <div style={{ width: '100px', textAlign: 'center' }}>
                <Spinner modified />
              </div>
            )
        }
      </form>
      <p className="my-1">
        Do not have an account?
        <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
