/* eslint-disable import/no-absolute-path */
/* eslint-disable no-console */

/**
 *
 * LoginPage
 *
 */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './raw.css';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { StyledBox } from 'components/GlobalComponents/StyledBox';
import { StyledSubmitButton } from 'components/GlobalComponents/StyledSubmitButton';
import { Box, borderRadius } from '@mui/system';
import { Alert, Button, TextField, Typography } from '@mui/material';
import makeSelectLoginPage, {
  makeSelectToken,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectError,
  makeSelectRole,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  changePasswordAction,
  changeUsernameAction,
  loginPageStoreCleanupAction,
  loginUserAction,
} from './actions';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
// import logo from '/app/images/logo-512x512.png';
// eslint-disable-next-line import/no-unresolved
import otasLoginImage from '/app/images/OTAS_login_image-634×360.png';
import userIcon from '/app/images/user-circle-svgrepo-com.png';
import passwordIcon from '/app/images/password-svgrepo-com.png';

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  token: makeSelectToken(),
  role: makeSelectRole(),
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const history = useHistory();
  const dispatch = useDispatch();
  const { username, password, loading, error, token, role } =
    useSelector(mapStateToProps);

  const onChangeUsername = (evt) =>
    dispatch(changeUsernameAction(evt.target.value));
  const onChangePassword = (evt) =>
    dispatch(changePasswordAction(evt.target.value));
  const onSubmitForm = () => {
    dispatch(loginUserAction(username, password));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);
      if (role === 'minimal-access') {
        history.push('/access-denied');
      } else {
        history.push('/my-requests');
      }
    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === 'minimal-access') {
        history.push('/access-denied');
      } else {
        history.push('/my-requests');
      }
    }
  }, [token]);
  useEffect(
    () => () => {
      dispatch(loginPageStoreCleanupAction());
    },
    [],
  );
  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (username && password) onSubmitForm();
    }
  };
  return (
    <div className="parent">
      <div className="form">
        <StyledBox loading={loading}>
          <div className="content">
            <img src={otasLoginImage} alt="OTAS" border="0"></img>
            <div className="form_front">
              <input
                type="text"
                placeholder="Username"
                className="input"
                id="username_input"
                value={username}
                disabled={loading}
                onChange={onChangeUsername}
                onKeyUp={handleKeypress}
              ></input>
              <input
                value={password}
                disabled={loading}
                onChange={onChangePassword}
                onKeyUp={handleKeypress}
                type="password"
                placeholder="Password"
                className="input"
                id="password_input"
              ></input>
            </div>
            {error !== true && error && (
              <Alert severity="error">Wrong credentials</Alert>
            )}
            <Button
              variant="outlined"
              type="submit"
              className="btn"
              disabled={!(username && password) || loading}
              onClick={onSubmitForm}
            >
              Login
            </Button>
          </div>
        </StyledBox>
      </div>
    </div>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
