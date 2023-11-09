/**
 *
 * TextInput
 *
 */

import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFormControl = styled(FormControl)`
  && {
    pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
    & .MuiInputLabel-root {
      color: ${(props) => (props.disabled ? '#D3D3D3 !important' : 'gray')};
      color: ${(props) => (props.error ? 'red' : 'gray')};
      &.Mui-focused {
        font-weight: bold;
        color: ${(props) => (props.disabled ? '#D3D3D3 !important' : 'black')};
        color: ${(props) => (props.error ? 'red' : 'black')};
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
export default function TextInput({
  value,
  onChange,
  label,
  onKeyRelease,
  disabled,
}) {
  return (
    <StyledFormControl
      sx={{ width: '25ch', marginBottom: 2, marginTop: 2 }}
      variant="outlined"
    >
      <InputLabel htmlFor="username-textbox">{label}</InputLabel>
      <OutlinedInput
        id="outlined-username-textbox"
        type="text"
        label={label}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyRelease}
      />
    </StyledFormControl>
  );
}
TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onKeyRelease: PropTypes.func,
  disabled: PropTypes.bool,
};
