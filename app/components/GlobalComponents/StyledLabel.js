/**
 *
 * StyledLabel
 *
 */
import React from 'react';
import { Box } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import styled from 'styled-components';

export const StyledLabelCss = styled(FormLabel)`
  && {
    text-transform: none;
    padding: 8px;
    margin: 16px;
    border-radius: 4px;
    display: block;
    width: 85px;
    font-weight: ${(props) => (props.disabled ? 'normal' : 'bold')};
    /* min-width: ${(props) => (props.width ? props.width : '170px')}; */
    background-color: white;
    outline: 1px solid black;
    color: black;
    text-align: center;
  }
`;
export const StyledLabel = ({ label }) => (
  <Box>
    <StyledLabelCss>{label}</StyledLabelCss>
  </Box>
);
