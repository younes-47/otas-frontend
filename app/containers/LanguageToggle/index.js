/**
 *
 * LanguageToggle
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
// import { appLocales } from 'i18n';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { StyledFormControl } from 'components/GlobalComponents/StyledFormControl';
import { StyledInputLabel } from 'components/GlobalComponents/StyledInputLabel';
import { StyledSelect } from 'components/GlobalComponents/StyledSelect';
import { StyledMenuItem } from 'components/GlobalComponents/StyledMenuItem';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});
export function LanguageToggle() {
  const dispatch = useDispatch();
  const { locale } = useSelector(mapStateToProps);
  const handleSelectedLocaleChange = (event) => {
    dispatch(changeLocale(event.target.value));
  };

  return (
    <Box alignItems="center" justifyContent="center" display="flex" right={0}>
      <StyledFormControl sx={{ m: 2, minWidth: 10 }}>
        <StyledInputLabel id="language toggle">
          <FormattedMessage id={messages.Label.id} />
        </StyledInputLabel>
        <StyledSelect
          labelId="language toggle"
          id="language toggle"
          value={locale}
          label="language toggle"
          onChange={handleSelectedLocaleChange}
        >
          <StyledMenuItem key="en" value="en">
            <FormattedMessage id={messages.en.id} />
          </StyledMenuItem>
          <StyledMenuItem key="fr" value="fr">
            <FormattedMessage id={messages.fr.id} />
          </StyledMenuItem>
        </StyledSelect>
      </StyledFormControl>
    </Box>
  );
}

LanguageToggle.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default LanguageToggle;
