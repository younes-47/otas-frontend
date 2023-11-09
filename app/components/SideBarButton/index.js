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
// import styled from 'styled-components';

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
  const selectedColor = selected ? '#ffffff' : '#202123';
  return (
    <>
      {selected ? (
        <Divider sx={{ borderColor: '#ffffff' }} />
      ) : (
        <Divider sx={{ borderColor: '#000000' }} />
      )}
      <Stack direction="row">
        <Box
          flex={isChild ? 2 : 0}
          sx={{ backgroundColor: `${selectedColor}` }}
        ></Box>
        <Box flex={24}>
          <ListItemButton
            selected={selected}
            onClick={onSidebarButtonClick}
            // sx={{ pl: padding }}
          >
            <ListItemIcon sx={{ color: '#ffffff' }}>
              <SideBarButtonIcon ButtonIconName={name} />
            </ListItemIcon>
            <ListItemText primary={displayName} sx={{ color: 'white' }} />
          </ListItemButton>
        </Box>
      </Stack>
      {selected ? (
        <Divider sx={{ borderColor: '#ffffff' }} />
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
