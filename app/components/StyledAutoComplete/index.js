/**
 *
 * StyledAutoComplete
 *
 */

import React, { useEffect, memo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledBox } from 'components/GlobalComponents/StyledBox';
import TextField from '@mui/material/TextField';

export const StyledAutocompleteSTYLES = styled(Autocomplete)`
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
function StyledAutoComplete({ label, dataArray, selectedId, onChangeHandler }) {
  let disable = false;
  if (dataArray.length === 1) {
    disable = true;
  }
  const [selectedItem, setSelectedItem] = useState('');
  // display selected Reference
  useEffect(() => {
    // if (selectedId === '') {
    //   setSelectedItem('');
    // }
    if (selectedId && dataArray.length) {
      setSelectedItem(dataArray.find((item) => item.id === selectedId).label);
    }
  }, [selectedId]);

  return (
    <StyledBox
      alignItems="center"
      justifyContent="center"
      display="flex"
      right={0}
    >
      <StyledAutocompleteSTYLES
        id="clear-on-escape"
        disableClearable
        clearOnEscape
        blurOnSelect
        disabled={disable}
        sx={{ m: 2, minWidth: 170 }}
        options={dataArray}
        value={selectedItem}
        isOptionEqualToValue={(option, value) => option.label === value}
        onChange={(event, newValue) => onChangeHandler(newValue.id)}
        renderInput={(params) => (
          <TextField {...params} label={label} /> // Default component;
        )}
      />
    </StyledBox>
  );
}

StyledAutoComplete.propTypes = {
  label: PropTypes.string.isRequired,
  dataArray: PropTypes.array.isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default memo(StyledAutoComplete);
