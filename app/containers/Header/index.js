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
import { useInjectSaga } from 'utils/injectSaga';
import TypographyJoy from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import reducer from './reducer';
import messages from '../SideBar/messages';
import LanguageSelector from './LanguageSelector';
import saga from './saga';
import { makeSelectErrorMessage } from './selectors';
import { setErrorAction } from './actions';

const mapStateToProps = createStructuredSelector({
  selectedMenu: makeSelectSelectedMenu(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  errorMessage: makeSelectErrorMessage(),
});
export function Header() {
  useInjectReducer({ key: 'header', reducer });
  useInjectSaga({ key: 'header', saga });

  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { selectedMenu, isSideBarVisible, errorMessage } =
    useSelector(mapStateToProps);

  let Title;
  if (messages[selectedMenu]?.id) {
    Title = intl.formatMessage({ id: messages[selectedMenu].id });
  } else {
    Title = 'Untitled';
  }
  const onLogOutButtonClick = () => {
    localStorage.clear();
    history.push('/login');
  };

  const onMenuIconClick = () => {
    dispatch(changeIsSideBarVisibleAction(!isSideBarVisible));
  };

  const hideHeader = () => location.pathname === '/login';
  useEffect(() => {
    AccessController(history, location.pathname);
  }, [location.pathname]);

  return (
    <>
      {hideHeader() ? (
        <Box></Box>
      ) : (
        <>
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
                {/* <LanguageToggle /> */}
                <LanguageSelector />
                <Button color="inherit" onClick={onLogOutButtonClick}>
                  <FormattedMessage id={messages.logout.id} />
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          <Modal
            open={errorMessage !== null}
            onClose={() => dispatch(setErrorAction(null))}
          >
            <ModalDialog color="danger" size="md" variant="soft">
              <ModalClose />
              <TypographyJoy level="h4" color="danger">
                {errorMessage?.response?.status === 500 && (
                  <> FATAL INTERNAL ERROR - 500</>
                )}
                {errorMessage?.response?.status === 400 && (
                  <> BAD REQUEST - 400</>
                )}
              </TypographyJoy>
              <Divider orientation="horizontal" />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <TypographyJoy
                  level="body-md"
                  color="danger"
                  variant="solid"
                  alignSelf="center"
                >
                  {errorMessage?.response?.data}
                </TypographyJoy>
                <TypographyJoy
                  sx={{ fontWeight: 'bold', marginTop: 2 }}
                  level="title-md"
                  color="danger"
                >
                  What does this mean?
                </TypographyJoy>
                <TypographyJoy level="body-md" color="danger">
                  An unexpected error occured while processing your request.
                  This mostly happens due to a bad request or an unhandeled
                  exception.
                </TypographyJoy>
                <TypographyJoy
                  level="body-md"
                  color="danger"
                  sx={{
                    fontWeight: 'bold',
                    marginTop: 2,
                    marginBottom: -1.5,
                  }}
                >
                  What should you do?
                </TypographyJoy>

                <List marker="disc">
                  <ListItem color="danger">
                    If you believe this is not supposed to occur, report the IT
                    deparment immediately with the incident to fix the issue
                  </ListItem>
                  <ListItem color="danger">
                    Try to initiate the request again especially if the error
                    occured due to a bad request
                  </ListItem>
                </List>
              </Box>
            </ModalDialog>
          </Modal>
        </>
      )}
    </>
  );
}

Header.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Header;
