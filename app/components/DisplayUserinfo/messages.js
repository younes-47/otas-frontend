/*
 * DisplayUserinfo Messages
 *
 * This contains all the text for the DisplayUserinfo component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DisplayUserinfo';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Requester Information',
  },
  requestOnBehalf: {
    id: `${scope}.requestOnBehalf`,
    defaultMessage:
      'This request has been created on behalf of someone whose information is specified below',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First Name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last Name',
  },

  employeeId: {
    id: `${scope}.employeeId`,
    defaultMessage: 'Employee ID',
  },

  title: {
    id: `${scope}.title`,
    defaultMessage: 'Title',
  },

  department: {
    id: `${scope}.department`,
    defaultMessage: 'Department',
  },

  manager: {
    id: `${scope}.manager`,
    defaultMessage: 'Manager',
  },
});
