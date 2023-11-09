/**
 *
 * PageTitle
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { makeSelectSelectedMenu } from 'containers/SideBar/selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import messages from '../../containers/SideBar/messages';

const mapStateToProps = createStructuredSelector({
  selectedMenu: makeSelectSelectedMenu(),
});
function PageTitle() {
  const intl = useIntl();
  const { selectedMenu } = useSelector(mapStateToProps);
  let Title;
  if (messages[selectedMenu]?.id) {
    Title = intl.formatMessage({ id: messages[selectedMenu].id });
  } else {
    Title = 'Untitled';
  }

  return (
    <Helmet>
      <title>{Title}</title>
      <meta name="description" content="Description of CenterPosts" />
    </Helmet>
  );
}

PageTitle.propTypes = {};

export default PageTitle;
