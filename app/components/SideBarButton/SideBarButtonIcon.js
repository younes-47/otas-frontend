import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CashHandIcon from 'components/CashHandIcon';
import CashStackIcon from 'components/CashStackIcon';
import DocSignatureIcon from 'components/DocSignatureIcon';
import UserIcon from 'components/UserIcon';

const SideBarButtonIcon = ({ ButtonIconName, color = '#fff' }) => {
  switch (ButtonIconName) {
    case 'myRequests':
      return <UserIcon />;
    case 'ordreMission':
      return <CardTravelIcon />;
    case 'avanceCaisse':
      return <CashHandIcon Color={color} />;
    case 'avanceVoyage':
      return <CashHandIcon Color={color} />;
    case 'depenseCaisse':
      return <CashStackIcon Color={color} />;
    case 'liquidation':
      return <CurrencyExchangeIcon />;
    case 'decideOnRequests':
      return <DocSignatureIcon />;
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
  color: PropTypes.string,
};
export default SideBarButtonIcon;
