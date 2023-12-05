export const accessControlRules = {
  myRequests: {
    path: '/my-requests',
    accessLevel: [
      'normal-requester',
      'department-manager',
      'human-resources',
      'finance-department',
      'general-director',
      'treasury',
    ],
    ordreMission: {
      path: '/my-requests/ordre-mission',
      accessLevel: [
        'normal-requester',
        'department-manager',
        'human-resources',
        'finance-department',
        'general-director',
        'treasury',
      ],
    },
  },

  // liquidation: {
  //   path: '/liquidation',
  //   accessLevel: [
  //     'normal-requester',
  //     'department-manager',
  //     'human-resources',
  //     'finance-department',
  //     'general-director',
  //     'treasury',
  //   ],
  // },

  // decide: {
  //   path: '/decide',
  //   accessLevel: [
  //     'department-manager',
  //     'human-resources',
  //     'finance-department',
  //     'general-director',
  //     'treasury',
  //   ],
  // },


};
