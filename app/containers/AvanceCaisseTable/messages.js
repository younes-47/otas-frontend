/*
 * AvanceCaisseTable Messages
 *
 * This contains all the text for the AvanceCaisseTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AvanceCaisseTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AvanceCaisseTable container!',
  },
  dialogHeader: {
    id: `${scope}.dialog.header`,
    defaultMessage: 'Are you sure you want to delete this request!',
  },
  TableDescription: {
    id: `${scope}.Table.description`,
    defaultMessage: 'Description',
  },
});
