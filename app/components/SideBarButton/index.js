/**
 *
 * SideBarButton
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SideBarButtonIcon from './SideBarButtonIcon';

/* eslint-disable no-nested-ternary */
function SideBarButton({
  displayName,
  name,
  selected,
  isChild,
  isCollapsable,
  onSidebarButtonClick,
}) {
  if (isCollapsable) {
    return (
      <>
        {selected ? (
          <Divider sx={{ borderColor: '#ffffff' }} />
        ) : (
          <Divider sx={{ borderColor: '#000000' }} />
        )}
        <ListItemButton selected={selected} onClick={onSidebarButtonClick}>
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <SideBarButtonIcon ButtonIconName={name} />
          </ListItemIcon>
          <ListItemText primary={displayName} sx={{ color: 'white' }} />
          {selected ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {selected ? (
          <Divider sx={{ borderColor: '#ffffff' }} />
        ) : (
          <Divider sx={{ borderColor: '#000000' }} />
        )}
      </>
    );
  }

  const color = !selected
    ? '#202123'
    : name === 'ordreMission' || name === 'decideOnOrdreMission'
    ? '#ef7765'
    : name === 'avanceCaisse' || name === 'decideOnAvanceCaisse'
    ? '#f3bc00'
    : name === 'avanceVoyage' || name === 'decideOnAvanceVoyage'
    ? '#00a697'
    : name === 'depenseCaisse' || name === 'decideOnDepenseCaisse'
    ? '#0075a4'
    : name === 'liquidation' || name === 'decideOnLiquidation'
    ? '#b865ef'
    : '#ffffff';
  const IconColor = color === '#202123' ? '#ffffff' : color;
  const selectedColor = selected ? '#ffffff' : '#202123';
  return (
    <>
      {selected ? (
        <Divider sx={{ borderColor: color }} />
      ) : (
        <Divider sx={{ borderColor: '#000000' }} />
      )}
      <Stack direction="row">
        <Box flex={isChild ? 2 : 0} sx={{ backgroundColor: `${color}` }}></Box>
        <Box flex={24} sx={{ backgroundColor: '#3e4044' }}>
          <ListItemButton
            selected={selected}
            onClick={onSidebarButtonClick}
            // sx={{ pl: padding }}
          >
            <ListItemIcon sx={{ color: IconColor }}>
              <SideBarButtonIcon ButtonIconName={name} color={IconColor} />
            </ListItemIcon>
            <ListItemText primary={displayName} sx={{ color: 'white' }} />
          </ListItemButton>
        </Box>
      </Stack>
      {selected ? (
        <Divider sx={{ borderColor: color }} />
      ) : (
        <Divider sx={{ borderColor: '#000000' }} />
      )}
    </>
  );
}

SideBarButton.propTypes = {
  displayName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  isChild: PropTypes.bool,
  isCollapsable: PropTypes.bool,
  onSidebarButtonClick: PropTypes.func,
};

export default SideBarButton;
