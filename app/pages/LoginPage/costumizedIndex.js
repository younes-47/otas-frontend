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
    <Box
      component="form"
      className="form"
      sx={{
        backgroundColor: 'white',
        padding: '3.125em',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '3px 13px 46px -12px rgba(200,15,23,0.79)',
        webkitBoxShadow: '3px 13px 46px -12px rgba(200,15,23,0.79)',
        mozBoxShadow: '3px 13px 46px -12px rgba(200,15,23,0.79)',
      }}
    >
      <StyledBox
        // sx={{
        //   background:
        //     'radial-gradient(circle at 50% -50%,#ffffff 10%,#ffffff 60%,#ffffff00 65%),radial-gradient(circle at 50% 65%,#ffffff 1%,#ffffff 20%,#f6f6f6 40%,#f2f2f2 45%)',
        //   padding: '20px',
        //   paddingX: '40px',
        //   borderRadius: '25px',
        // }}
        error={error !== true && error}
      >
        <img
          src={otasLoginImage}
          alt="OTAS"
          style={{ height: '150px', marginBottom: '30px' }}
        />
        <StyledBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          loading={loading}
        >
          <TextField
            value={username}
            disabled={loading}
            onChange={onChangeUsername}
            onKeyRelease={handleKeypress}
            type="text"
            placeholder="Username"
            className="input"
            id="username_input"
            InputProps={{
              startAdornment: (
                <img
                  src={userIcon}
                  alt="user-icon"
                  style={{ marginLeft: '12px', marginRight: '11px' }}
                />
              ),
            }}
          />
          <TextField
            value={password}
            disabled={loading}
            onChange={onChangePassword}
            onKeyRelease={handleKeypress}
            type="password"
            placeholder="Password"
            className="input"
            id="password_input"
            InputProps={{
              startAdornment: (
                <img
                  src={passwordIcon}
                  alt="password-icon"
                  style={{ marginLeft: '12px', marginRight: '11px' }}
                />
              ),
            }}
          />

          <Button
            disabled={!(username && password) || loading}
            onClick={onSubmitForm}
            variant="outlined"
            className="btn"
            sx={{
              marginTop: '10px',
              fontSize: '15px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0.5em 2em',
              borderRadius: '6em',
              transition: 'all .2s',
              borderWidth: '0.5 px',
              borderStyle: 'solid',
              borderColor: '#c80f17',
              fontWeight: '600',
              color: '#c80f17',
              backgroundColor: 'white',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                color: 'white',
                backgroundColor: '#c80f17',
                cursor: 'pointer',
              },
              '&:active': {
                transform: 'translateY(-1px)',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              },
              '&::after': {
                content: '""',
                display: 'inline-block',
                height: '100%',
                width: '100%',
                borderRadius: '100px',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '-1',
                transition: 'all .4s',
                backgroundColor: '#f79292',
              },
              '&:hover::after': {
                transform: 'scaleX(1.4) scaleY(1.6)',
                opacity: '0',
              },
            }}
          >
            Login
          </Button>
        </StyledBox>
      </StyledBox>
    </Box>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
