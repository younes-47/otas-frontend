/**
 *
 * AvanceVoyage
 *
 */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tables from 'components/Tables';
import { useEffect } from 'react';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import AvanceVoyageTable from 'containers/AvanceVoyageTable';
import AvanceVoyageView from 'containers/AvanceVoyageView';
import { cleanupStoreAction, loadAvanceVoyageAction } from './actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectChangePageContent } from './selectors';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function AvanceVoyage() {
  useInjectReducer({ key: 'avanceVoyage', reducer });

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );
  const { pageContent } = useSelector(mapStateToProps);
  if (pageContent === 'VIEW') {
    return <AvanceVoyageView></AvanceVoyageView>;
  }
  return <AvanceVoyageTable></AvanceVoyageTable>;
}

AvanceVoyage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceVoyage;
