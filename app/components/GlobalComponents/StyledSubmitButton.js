/**
 *
 * StyledSubmitButton
 *
 */

import Button from '@mui/material/Button';
import styled from 'styled-components';

export const StyledSubmitButton = styled(Button)`
  && {
    margin: 16px;
    font-weight: ${(props) => (props.disabled ? 'normal' : 'bold')};
    min-width: 170px;
    color: ${(props) => (props.disabled ? '#c0c0c0' : 'white')};
    background-color: ${(props) => (props.disabled ? '#eaeaea' : 'black')};
    :hover {
      color: black;
      background-color: white;
      outline: 1px solid black;
    }
  }
`;
