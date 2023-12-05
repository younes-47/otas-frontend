/**
 *
 * Header
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectIsSideBarVisible,
  makeSelectSelectedMenu,
} from 'containers/SideBar/selectors';
import { useHistory, useLocation } from 'react-router-dom';
import { changeIsSideBarVisibleAction } from 'containers/SideBar/actions';
import AccessController from 'utils/Custom/checkLogin';
import { FormattedMessage, useIntl } from 'react-intl';
import reducer from './reducer';
import messages from '../SideBar/messages';

const mapStateToProps = createStructuredSelector({
  selectedMenu: makeSelectSelectedMenu(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});
export function Header() {
  useInjectReducer({ key: 'header', reducer });

  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { selectedMenu, isSideBarVisible } = useSelector(mapStateToProps);

  let Title;
  if (messages[selectedMenu]?.id) {
    Title = intl.formatMessage({ id: messages[selectedMenu].id });
  } else {
    Title = 'Untitled';
  }
  const onLogOutButtonClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    history.push('/login');
  };

  const onMenuIconClick = () => {
    dispatch(changeIsSideBarVisibleAction(!isSideBarVisible));
  };

  const hideHeader = () => location.pathname === '/login';
  // useEffect(() => {
  //   AccessController(history, location.pathname);
  // }, [location.pathname]);

  return (
    <>
      {hideHeader() ? (
        <Box></Box>
      ) : (
        <Box position="absolute" left={isSideBarVisible ? 200 : 0} right={0}>
          <AppBar position="static" sx={{ backgroundColor: '#202123' }}>
            <Toolbar variant="regular" sx={{ height: '64px' }}>
              <IconButton
                onClick={onMenuIconClick}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ flexGrow: 1, maxHeight: '64px', whiteSpace: 'nowrap' }}
              >
                {Title}
              </Typography>
              <Button color="inherit" onClick={onLogOutButtonClick}>
                <FormattedMessage id={messages.logout.id} />
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}

Header.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Header;
