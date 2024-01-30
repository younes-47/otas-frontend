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
    <StyledBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#f2f2f2"
    >
      <StyledBox
        sx={{
          background:
            'radial-gradient(circle at 50% -50%,#ffffff 10%,#ffffff 60%,#ffffff00 65%),radial-gradient(circle at 50% 65%,#ffffff 1%,#ffffff 20%,#f6f6f6 40%,#f2f2f2 45%)',
          padding: '20px',
          paddingX: '40px',
          borderRadius: '25px',
        }}
        error={error !== true && error}
      >
        <StyledBox
          component="img"
          sx={{
            alignSelf: 'center',
            height: 180,
            width: 317,
            margin: '10px',
            marginBottom: '24px',
          }}
          alt="Dicastal Logo"
          src={otasLoginImage}
        />
        <StyledBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          loading={loading}
        >
          <TextInput
            value={username}
            disabled={loading}
            label="Username"
            onChange={onChangeUsername}
            onKeyRelease={handleKeypress}
          />
          <PasswordInput
            value={password}
            disabled={loading}
            onChange={onChangePassword}
            onKeyRelease={handleKeypress}
          />
          <StyledSubmitButton
            sx={{ textTransform: 'none', width: '222px' }}
            variant="contained"
            disabled={!(username && password) || loading}
            onClick={onSubmitForm}
          >
            Log In
          </StyledSubmitButton>
        </StyledBox>
      </StyledBox>
    </StyledBox>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
