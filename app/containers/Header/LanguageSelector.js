/**
 *
 * LanguageSelector
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
// import { appLocales } from 'i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { appLocales } from 'i18n';
import messages from 'containers/LanguageToggle/messages';
import GTranslate from '@mui/icons-material/GTranslate';
import { StyledFormControl } from 'components/GlobalComponents/StyledFormControl';
import { StyledSelect } from 'components/GlobalComponents/StyledSelect';
import { StyledMenuItem } from 'components/GlobalComponents/StyledMenuItem';
import {
  makeSelectChangingPreferredLanguage,
  makeSelectErrorPreferredLanguage,
  makeSelectPreferredLanguage,
} from './selectors';
import { changePreferredLanguageAction } from './actions';

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  preferredLanguage: makeSelectPreferredLanguage(),
  errorPreferredLanguage: makeSelectErrorPreferredLanguage(),
  changingPreferredLanguage: makeSelectChangingPreferredLanguage(),
});
export function LanguageSelector() {
  const dispatch = useDispatch();
  const { locale, preferredLanguage } = useSelector(mapStateToProps);

  const handleSelectedPreferredLanguageChange = (event) => {
    if (appLocales.includes(event.target.value)) {
      dispatch(changePreferredLanguageAction(event.target.value));
    } else {
      // console.log('this locale does not exist');
    }
  };
  useEffect(() => {
    if (
      preferredLanguage !== locale &&
      appLocales.includes(preferredLanguage)
    ) {
      dispatch(changeLocale(preferredLanguage));
    }
  }, [preferredLanguage]);

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      right={0}
      sx={{ m: 2 }}
    >
      <GTranslate />
      <StyledFormControl sx={{ minWidth: 10 }}>
        <StyledSelect
          labelId="language toggle"
          id="language toggle"
          value={locale}
          label="language toggle"
          onChange={handleSelectedPreferredLanguageChange}
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

LanguageSelector.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default LanguageSelector;
