import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import OrdreMissionTable from 'containers/OrdreMissionTable';
import OrdreMissionForm from 'containers/OrdreMissionForm';
import { useInjectSaga } from 'utils/injectSaga';
import OrdreMissionView from 'containers/OrdreMissionView';
import reducer from './reducer';

import saga from './saga';
import { makeSelectPageContent } from './selectors';
import { cleanupParentOrdreMissionPageAction } from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  pageContent: makeSelectPageContent(),
});

export function OrdreMission() {
  useInjectReducer({ key: 'ordreMission', reducer });
  // useInjectSaga({ key: 'ordreMission', saga });

  const { pageContent } = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  // useEffect(
  //   () => () => {
  //     dispatch(cleanupParentOrdreMissionPageAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'ADD':
      return <OrdreMissionForm state="ADD" />;
    case 'VIEW':
      return <OrdreMissionForm state="VIEW" />;
    case 'CONFIRM':
      return <OrdreMissionForm state="CONFIRM" />;
    case 'EDIT':
      return <OrdreMissionForm state="EDIT" />;
    case 'MODIFY': // This case is when the user modifies its request in a returned state, which whill restrict saving it as draft again
      return <OrdreMissionForm state="MODIFY" />;
    default:
      return <OrdreMissionTable />;
  }
}

OrdreMission.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMission;
