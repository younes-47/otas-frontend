/**
 *
 * DropDownMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { StyledFormControl } from 'components/GlobalComponents/StyledFormControl';
import { StyledInputLabel } from 'components/GlobalComponents/StyledInputLabel';
import { StyledSelect } from 'components/GlobalComponents/StyledSelect';
import { StyledMenuItem } from 'components/GlobalComponents/StyledMenuItem';

function DropDownMenu({
  label,
  dataArray,
  selectedMenuItem,
  onSelectedMenuItemChange,
}) {
  let disable = false;
  if (dataArray.length === 1) {
    disable = true;
  }
  return (
    <Box alignItems="center" justifyContent="center" display="flex" right={0}>
      <StyledFormControl disabled={disable} sx={{ m: 2, minWidth: 170 }}>
        <StyledInputLabel id={label}>{label}</StyledInputLabel>
        <StyledSelect
          labelId={label}
          id={label}
          value={selectedMenuItem}
          label={label}
          onChange={(event) => onSelectedMenuItemChange(event.target.value)}
        >
          {Object.values(dataArray).map((value) => (
            <StyledMenuItem key={value.id} value={value.id}>
              {value.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </Box>
  );
}

DropDownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  dataArray: PropTypes.array.isRequired,
  selectedMenuItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelectedMenuItemChange: PropTypes.func.isRequired,
};

export default DropDownMenu;
