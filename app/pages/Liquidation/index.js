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
import { cleanupliquidationParentPageStoreAction } from './actions';

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
      disptach(cleanupliquidationParentPageStoreAction());
    },
    [],
  );

  switch (pageContent) {
    case 'ADD':
      return <LiquidationForm state="ADD" />;
    case 'VIEW':
      return <LiquidationForm state="VIEW" />;
    case 'CONFIRM':
      return <LiquidationForm state="CONFIRM" />;
    case 'EDIT':
      return <LiquidationForm state="EDIT" />;
    case 'MODIFY': // This case is when the user modifies its request in a returned state, which whill restrict saving it as draft again
      return <LiquidationForm state="MODIFY" />;
    default:
      return <LiquidationTable />;
  }
}

Liquidation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Liquidation;
