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
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { makeSelectChangePageContent } from './selectors';
import { cleanupDepesneCaisseParentPageStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function DepenseCaisse() {
  useInjectReducer({ key: 'depenseCaisse', reducer });
  useInjectSaga({ key: 'depenseCaisse', saga });
  const { pageContent } = useSelector(mapStateToProps);

  const dispatch = useDispatch();
  // useEffect(
  //   () => () => {
  //     dispatch(cleanupDepesneCaisseParentPageStoreAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'ADD':
      return <DepenseCaisseForm state="ADD" />;
    case 'VIEW':
      return <DepenseCaisseForm state="VIEW" />;
    case 'CONFIRM':
      return <DepenseCaisseForm state="CONFIRM" />;
    case 'EDIT':
      return <DepenseCaisseForm state="EDIT" />;
    case 'MODIFY': // This case is when the user modifies its request in a returned state, which whill restrict saving it as draft again
      return <DepenseCaisseForm state="MODIFY" />;
    default:
      return <DepenseCaisseTable />;
  }
}

DepenseCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DepenseCaisse;
