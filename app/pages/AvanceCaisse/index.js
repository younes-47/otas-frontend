/**
 *
 * AvanceCaisse
 *
 */

import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import AvanceCaisseTable from 'containers/AvanceCaisseTable';
import { AvanceCaisseForm } from 'containers/AvanceCaisseForm';
import { useDispatch, useSelector } from 'react-redux';
import saga from './saga';
import reducer from './reducer';
import { makeSelectChangePageContent } from './selectors';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function AvanceCaisse() {
  useInjectReducer({ key: 'avanceCaisse', reducer });
  // useInjectSaga({ key: 'avanceCaisse', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  // useEffect(
  //   () => () => {
  //     dispatch(cleanupStoreAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'ADD':
      return <AvanceCaisseForm state="ADD" />;
    case 'VIEW':
      return <AvanceCaisseForm state="VIEW" />;
    case 'CONFIRM':
      return <AvanceCaisseForm state="CONFIRM" />;
    case 'EDIT':
      return <AvanceCaisseForm state="EDIT" />;
    case 'MODIFY': // This case is when the user modifies its request in a returned state, which whill restrict saving it as draft again
      return <AvanceCaisseForm state="MODIFY" />;
    default:
      return <AvanceCaisseTable />;
  }
}

AvanceCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceCaisse;
