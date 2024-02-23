/*
 * ActualRequesterInputs Messages
 *
 * This contains all the text for the ActualRequesterInputs component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ActualRequesterInputs';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Please fill the actual requester information*',
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

  jobTitle: {
    id: `${scope}.jobTitle`,
    defaultMessage: 'Job Title*',
  },

  department: {
    id: `${scope}.department`,
    defaultMessage: 'Department*',
  },

  manager: {
    id: `${scope}.manager`,
    defaultMessage: 'Manager',
  },
});
