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
  useInjectSaga({ key: 'avanceCaisse', saga });
  const disptach = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  useEffect(
    () => () => {
      disptach(cleanupStoreAction());
    },
    [],
  );
  if (pageContent === 'ADD') {
    return <AvanceCaisseForm></AvanceCaisseForm>;
  }
  return <AvanceCaisseTable></AvanceCaisseTable>;
}

AvanceCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceCaisse;
