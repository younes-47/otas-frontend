/**
 *
 * Box
 *
 */

import Box from '@mui/material/Box';
import styled from 'styled-components';

export const StyledBox = styled(Box)`
  && {
    pointer-events: ${(props) => (props.disabled ? 'none' : null)};
    filter: ${(props) => (props.loading ? 'blur(2px)' : 'none')};
    border: ${(props) => (props.error ? 'solid red 2px' : 'none')};
  }
`;
