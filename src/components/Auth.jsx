import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Auth = (props) => {
  const { onConfirmDelete, onCloseNotification } = props;
  const [password, setPassword] = useState('');

  const onConfirm = () => {
    onConfirmDelete(password);
  };

  const onClose = () => {
    onCloseNotification();
  };

  return (
    <>
      <span className="dialog-msg">Please Enter Your Current Password</span>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => { event.preventDefault(); setPassword(event.target.value); }}
        value={password}
      />
      <div className="button-div">
        <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={onConfirm}>Ok</button>
      </div>
    </>
  );
};

Auth.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  onCloseNotification: PropTypes.func.isRequired,
};

export default Auth;
