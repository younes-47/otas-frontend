/**
 *
 * UserIcon
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import SvgIcon from '@mui/material/SvgIcon';

function UserIcon() {
  return (
    <SvgIcon>
      <svg
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 52 52"
        enableBackground="new 0 0 52 52"
        xmlSpace="preserve"
      >
        <path
          d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2
	c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1
	c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2
	S19.4,2,26,2z"
        />
      </svg>
    </SvgIcon>
  );
}

UserIcon.propTypes = {};

export default UserIcon;
