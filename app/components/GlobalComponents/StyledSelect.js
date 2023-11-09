/**
 *
 * Select
 *
 */

import Select from '@mui/material/Select';
import styled from 'styled-components';

export const StyledSelect = styled(Select)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#C0C0C0',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});
