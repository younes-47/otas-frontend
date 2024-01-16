import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

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
    case 'liquidation':
      return <ArrowForwardIosIcon />;
    case 'decideOnRequests':
      return <AssignmentIcon />;
    case 'decideOnOrdreMission':
      return <EditIcon />;
    case 'decideOnAvanceCaisse':
      return <EditIcon />;
    case 'decideOnAvanceVoyage':
      return <EditIcon />;
    case 'decideOnDepenseCaisse':
      return <EditIcon />;
    case 'decideOnLiquidation':
      return <EditIcon />;
    default:
      return null;
  }
};

SideBarButtonIcon.propTypes = {
  ButtonIconName: PropTypes.string.isRequired,
};
export default SideBarButtonIcon;
