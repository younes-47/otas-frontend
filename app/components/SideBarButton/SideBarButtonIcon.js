import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import TerminalIcon from '@mui/icons-material/Terminal';
import PropTypes from 'prop-types';

const SideBarButtonIcon = ({ ButtonIconName }) => {
  switch (ButtonIconName) {
    case 'overview':
      return <DashboardIcon />;
    case 'dashboard':
      return <SortRoundedIcon />;
    case 'reporting':
      return <QueryStatsRoundedIcon />;
    case 'forms':
      return <AssignmentIcon />;
    case 'toolChange':
      return <AssignmentIcon />;
    case 'typeChange':
      return <AssignmentIcon />;
    case 'visualStore':
      return <StoreIcon />;
    case 'archives':
      return <FolderIcon />;
    case 'database':
      return <StorageIcon />;
    case 'references':
      return <AssignmentIcon />;
    case 'centerPosts':
      return <AssignmentIcon />;
    case 'machinePrograms':
      return <TerminalIcon />;
    case 'gauges':
      return <AssignmentIcon />;
    case 'drills':
      return <AssignmentIcon />;
    case 'inserts':
      return <AssignmentIcon />;
    case 'users':
      return <GroupIcon />;
    case 'settings':
      return <SettingsApplicationsIcon />;
    default:
      return null;
  }
};

SideBarButtonIcon.propTypes = {
  ButtonIconName: PropTypes.string.isRequired,
};
export default SideBarButtonIcon;
