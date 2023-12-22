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
import { loadAvanceVoyageAction } from './actions';
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
  const { pageContent } = useSelector(mapStateToProps);

  return <AvanceVoyageTable></AvanceVoyageTable>;
}

AvanceVoyage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceVoyage;
