import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from './spinner/Spinner';

const Auth = (props) => {
  const { onConfirmDelete, onCloseDialog } = props;
  const [password, setPassword] = useState('');
  const [onProgress, setProgress] = useState(false);

  const config = {
    PASSWORD_LENGTH: true,
  };

  const [flags, setFlags] = useState(config);

  useEffect(() => {
    if (password && password.length < 6) {
      setFlags((prev) => ({ ...prev, PASSWORD_LENGTH: true }));
    } else {
      setFlags((prev) => ({ ...prev, PASSWORD_LENGTH: false }));
    }
  }, [password]);

  const passwordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const onConfirm = () => {
    setProgress(true);
    onConfirmDelete(password);
  };

  const onClose = () => {
    onCloseDialog();
  };

  return (
    <>
      <span id="dialog-description" className="dialog-msg">Please Enter Your Current Password</span>
      <input
        type="password"
        name="password"
        aria-label="Current Password"
        aria-required="true"
        ref={passwordRef}
        className={flags.PASSWORD_LENGTH ? 'error' : ''}
        placeholder="Current Passoword"
        onChange={(event) => { event.preventDefault(); setPassword(event.target.value); }}
        value={password}
      />
      {
        !onProgress
          ? (
            <div className="button-div">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button disabled={flags.PASSWORD_LENGTH} type="button" className="btn btn-primary" onClick={onConfirm}>Ok</button>
            </div>
          )
          : <Spinner modified />
      }
    </>
  );
};

Auth.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default Auth;
