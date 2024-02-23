/**
 *
 * FormControl
 *
 */

import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';

export const StyledFormControl = styled(FormControl)`
  && {
    & .MuiInputLabel-root {
      color: white;
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        border-width: 0px;
      }
      & fieldset {
        border-color: white;
      }
      &:hover fieldset {
        border-color: white;
      }
      &.Mui-focused fieldset {
        border-color: white;
      }
    }
    & .MuiInputBase-input {
      color: white;
    }
    & .MuiSvgIcon-root {
      color: white;
    }
  }
`;
