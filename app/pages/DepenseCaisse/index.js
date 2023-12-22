/**
 *
 * DepenseCaisse
 *
 */

import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import DepenseCaisseForm from 'containers/DepenseCaisseForm';
import DepenseCaisseTable from 'containers/DepenseCaisseTable';
import reducer from './reducer';
import { makeSelectChangePageContent } from './selectors';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function DepenseCaisse() {
  useInjectReducer({ key: 'depenseCaisse', reducer });
  const { pageContent } = useSelector(mapStateToProps);

  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );

  if (pageContent === 'ADD') {
    return <DepenseCaisseForm></DepenseCaisseForm>;
  }
  return <DepenseCaisseTable></DepenseCaisseTable>;
}

DepenseCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DepenseCaisse;
