/**
 *
 * PasswordInput
 *
 */

import React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFormControl = styled(FormControl)`
  && {
    pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
    & .MuiInputLabel-root {
      color: ${(props) => (props.disabled ? 'gray !important' : 'gray')};
      color: ${(props) => (props.error ? 'red' : 'gray')};
      &.Mui-focused {
        font-weight: bold;
        color: ${(props) => (props.disabled ? 'gray !important' : 'black')};
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

export default function PasswordInput({
  value,
  onChange,
  onKeyRelease,
  disabled,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledFormControl
      sx={{ width: '25ch', marginBottom: 2, marginTop: 2 }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        disabled={disabled}
        onKeyDown={onKeyRelease}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
        label="Password"
      />
    </StyledFormControl>
  );
}
PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyRelease: PropTypes.func,
  disabled: PropTypes.bool,
};
