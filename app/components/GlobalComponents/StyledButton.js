/**
 *
 * StyledButton
 *
 */

import Button from '@mui/material/Button';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  && {
    text-transform: none;
    margin: 16px;
    font-weight: ${(props) => (props.disabled ? 'normal' : 'bold')};
    min-width: ${(props) => (props.width ? props.width : '170px')};
    color: ${(props) => (props.disabled ? '#c0c0c0' : 'white')};
    background-color: ${(props) => (props.disabled ? '#eaeaea' : '#202123')};
    :hover {
      color: black;
      background-color: white;
      outline: 1px solid black;
    }
  }
`;
