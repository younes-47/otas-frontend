/**
 *
 * FormControl
 *
 */

import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';

export const StyledFormControl = styled(FormControl)`
  && {
    pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
    & .MuiInputLabel-root {
      color: ${(props) => (props.disabled ? 'gray !important' : 'black')};
      color: ${(props) => (props.error ? 'red' : 'black')};
      &.Mui-focused {
        font-weight: bold;
      }
    }

    & .MuiOutlinedInput-root {
      & fieldset {
        border-color: ${(props) => (props.error ? 'red' : '#c0c0c0')};
      }
      &:hover fieldset {
        border-color: ${(props) => (props.error ? 'red' : 'black')};
      }
      &.Mui-focused fieldset {
        border-color: ${(props) => (props.error ? 'red' : 'black')};
      }
    }

    & .MuiFormHelperText-root {
      color: ${(props) => (props.error ? 'red' : 'black')};
    }
  }
`;
