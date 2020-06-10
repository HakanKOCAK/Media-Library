import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Error from './Error';
import submitRegister from '../actions/register';
import { nameSurnameCheck, emailCheck } from '../Utils/regExp';
import Spinner from './spinner/Spinner';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [onProgress, setProgress] = useState(false);

  const config = {
    PASSWORDS_DO_NOT_MATCH: false,
    PASSWORD_LENGTH: false,
    USER_EXIST: false,
    EMAIL_FORMAT: false,
    INVALID_NAME: false,
    INVALID_SURNAME: false,
  };

  const [flags, setFlag] = useState(config);

  useEffect(() => {
    if (firstName && !nameSurnameCheck(firstName)) {
      setFlag((prev) => ({ ...prev, INVALID_NAME: true }));
    } else {
      setFlag((prev) => ({ ...prev, INVALID_NAME: false }));
    }
  }, [firstName]);

  useEffect(() => {
    if (surname && !nameSurnameCheck(surname)) {
      setFlag((prev) => ({ ...prev, INVALID_SURNAME: true }));
    } else {
      setFlag((prev) => ({ ...prev, INVALID_SURNAME: false }));
    }
  }, [surname]);

  useEffect(() => {
    if (email && !emailCheck(email)) {
      setFlag((prev) => ({ ...prev, EMAIL_FORMAT: true, USER_EXIST: false }));
    } else {
      setFlag((prev) => ({ ...prev, EMAIL_FORMAT: false, USER_EXIST: false }));
    }
  }, [email]);

  useEffect(() => {
    if (password && password.length < 6) {
      setFlag((prev) => ({ ...prev, PASSWORD_LENGTH: true }));
    } else {
      setFlag((prev) => ({ ...prev, PASSWORD_LENGTH: false }));
    }
    if (password2 !== password) {
      setFlag((prev) => ({ ...prev, PASSWORDS_DO_NOT_MATCH: true }));
    } else {
      setFlag((prev) => ({ ...prev, PASSWORDS_DO_NOT_MATCH: false }));
    }
  }, [password, password2]);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'secondName':
        setSecondName(value);
        break;
      case 'surname':
        setSurname(value);
        break;
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
      default:
        break;
    }
  };

  const onSubmit = async (
    event,
    submittedFirstName,
    submittedSecondName,
    submittedSurname,
    submittedEmail,
    submittedPassword,
    submittedPassword2,
  ) => {
    event.preventDefault();
    if (submittedPassword === submittedPassword2) {
      setProgress(true);
      dispatch(submitRegister(
        submittedFirstName,
        submittedSecondName,
        submittedSurname,
        submittedEmail,
        submittedPassword,
      )).then((response) => {
        if (response.error && response.error.code === 'auth/email-already-in-use') {
          setProgress(false);
          setFlag({ ...flags, USER_EXIST: true });
        }
      });
    } else {
      setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: true });
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Create Your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event, firstName, secondName, surname, email, password, password2)}>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              aria-label="First Name"
              aria-required="true"
              style={{ marginRight: '5px' }}
              className={flags.INVALID_NAME ? 'error' : ''}
              value={firstName}
              onChange={(event) => onChange(event)}
              required
            />
            <input
              type="text"
              placeholder="Second Name"
              aria-label="Second Name"
              style={{ marginRight: '5px' }}
              name="secondName"
              value={secondName}
              onChange={(event) => onChange(event)}
            />
            <input
              type="text"
              placeholder="Surname"
              aria-label="Surname"
              aria-required="true"
              name="surname"
              className={flags.INVALID_SURNAME ? 'error' : ''}
              value={surname}
              onChange={(event) => onChange(event)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Adress"
            aria-required="true"
            name="userEmail"
            className={flags.USER_EXIST || flags.EMAIL_FORMAT ? 'error' : ''}
            value={email}
            onChange={(event) => onChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-required="true"
            name="userPassword"
            className={flags.PASSWORDS_DO_NOT_MATCH ? 'error' : ''}
            value={password}
            onChange={(event) => onChange(event)}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-required="true"
            name="userPassword2"
            className={flags.PASSWORDS_DO_NOT_MATCH ? 'error' : ''}
            value={password2}
            onChange={(event) => onChange(event)}
            required
          />
        </div>
        <Error flags={flags} />
        {
          !onProgress
            ? <input type="submit" className="btn btn-primary" value="Register" />
            : (
              <div style={{ width: '100px', textAlign: 'center' }}>
                <Spinner modified />
              </div>
            )
        }
      </form>
      <p className="my-1">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default Register;
