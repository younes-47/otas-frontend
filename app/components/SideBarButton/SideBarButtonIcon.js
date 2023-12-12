import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';

const SideBarButtonIcon = ({ ButtonIconName }) => {
  switch (ButtonIconName) {
    case 'myRequests':
      return <AssignmentIcon />;
    case 'ordreMission':
      return <ArrowForwardIosIcon />;
    case 'avanceCaisse':
      return <ArrowForwardIosIcon />;
    case 'avanceVoyage':
      return <ArrowForwardIosIcon />;
    case 'depenseCaisse':
      return <ArrowForwardIosIcon />;
    default:
      return null;
  }
};

SideBarButtonIcon.propTypes = {
  ButtonIconName: PropTypes.string.isRequired,
};
export default SideBarButtonIcon;
