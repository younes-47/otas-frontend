import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import OrdreMissionTable from 'containers/OrdreMissionTable';
import OrdreMissionForm from 'containers/OrdreMissionForm';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';

import saga from './saga';
import { makeSelectPageContent } from './selectors';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  pageContent: makeSelectPageContent(),
});

export function OrdreMission() {
  useInjectReducer({ key: 'ordreMission', reducer });
  const { pageContent } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );

  if (pageContent === 'ADD') {
    return <OrdreMissionForm></OrdreMissionForm>;
  }
  return <OrdreMissionTable></OrdreMissionTable>;
}

OrdreMission.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMission;
