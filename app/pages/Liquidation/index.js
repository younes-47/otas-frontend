/**
 *
 * Liquidation
 *
 */

import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { LiquidationForm } from 'containers/LiquidationForm';
import { LiquidationTable } from 'containers/LiquidationTable';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectChangePageContent } from './selectors';
import reducer from './reducer';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function Liquidation() {
  useInjectReducer({ key: 'liquidation', reducer });

  const disptach = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  useEffect(
    () => () => {
      disptach(cleanupStoreAction());
    },
    [],
  );

  if (pageContent === 'ADD') {
    return <LiquidationForm></LiquidationForm>;
  }
  return <LiquidationTable></LiquidationTable>;
}

Liquidation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Liquidation;
