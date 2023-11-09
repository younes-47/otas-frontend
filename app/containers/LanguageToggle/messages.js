/*
 * LanguageToggle Messages
 *
 * This contains all the text for the LanguageToggle container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LanguageToggle';

export default defineMessages({
  Label: {
    id: `${scope}.title`,
    defaultMessage: '-Language',
  },
  en: {
    id: `${scope}.english`,
    defaultMessage: '-English',
  },
  fr: {
    id: `${scope}.french`,
    defaultMessage: '-French',
  },
});
