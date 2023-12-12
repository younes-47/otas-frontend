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
      addOrdreMission: {
        path: '/my-requests/ordre-mission/add',
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
    avanceVoyage: {
      path: '/my-requests/avance-voyage',
      accessLevel: [
        'normal-requester',
        'department-manager',
        'human-resources',
        'finance-department',
        'general-director',
        'treasury',
      ],
    },
    avanceCaisse: {
      path: '/my-requests/avance-caisse',
      accessLevel: [
        'normal-requester',
        'department-manager',
        'human-resources',
        'finance-department',
        'general-director',
        'treasury',
      ],
    },
    depenseCaisse: {
      path: '/my-requests/depense-caisse',
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


};
