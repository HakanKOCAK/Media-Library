import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Error from './Error';
import { updatePassword } from '../actions/user';
import { UPDATE_PASSWORD_REQUEST } from '../actions/types';

const Profile = (props) => {
  const dispatch = useDispatch();

  const { user } = props;

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const config = {
    PASSWORDS_DO_NOT_MATCH: false,
    PASSWORD_LENGTH: false,
    CHANGE_SUCCESSFUL: false,
    RECENT_LOGIN: false,
  };

  const [flags, setFlag] = useState(config);

  useEffect(() => {
    if (password.length < 6) {
      setFlag({ ...flags, PASSWORD_LENGTH: true });
    } else {
      setFlag({ ...flags, PASSWORD_LENGTH: false });
    }
  }, [password]);

  useEffect(() => {
    if (password2 !== password) {
      setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: true });
    } else {
      setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: false });
    }
  }, [password2]);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
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
    submittedPassword,
    submittedPassword2,
  ) => {
    event.preventDefault();
    if (submittedPassword === submittedPassword2) {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      dispatch(updatePassword(submittedPassword)).then((resp) => {
        if (resp.success) {
          setFlag({ ...flags, CHANGE_SUCCESSFUL: true });
          setTimeout(() => { setFlag({ ...flags, CHANGE_SUCCESSFUL: false }); }, 3000);
        } else {
          switch (resp.code) {
            case 'auth/weak-password':
              setFlag({ ...flags, PASSWORD_LENGTH: true });
              break;
            case 'auth/requires-recent-login':
              setFlag({ ...flags, RECENT_LOGIN: true });
              break;
            default:
              break;
          }
        }
      });
      setPassword('');
      setPassword2('');
    } else {
      setFlag({ ...flags, PASSWORDS_DO_NOT_MATCH: true });
    }
  };

  return (
    <>
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Update password
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event, password, password2)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
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
            name="userPassword2"
            minLength="6"
            className={flags.PASSWORDS_DO_NOT_MATCH ? 'error' : ''}
            value={password2}
            onChange={(event) => onChange(event)}
            required
          />
        </div>
        {flags.CHANGE_SUCCESSFUL ? <p className="mtop-1 m-bottom-1 success">Password successfully changed.</p> : null}
        <Error flags={flags} />
        <input className="btn btn-primary" type="submit" value="Update Password" />
      </form>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default Profile;
