export const accessControlRules = {
  myRequests: {
    path: '/my-requests',
    accessLevel: ['requester', 'decider'],
    ordreMission: {
      path: '/my-requests/ordre-mission',
      accessLevel: ['requester', 'decider'],
    },
    avanceVoyage: {
      path: '/my-requests/avance-voyage',
      accessLevel: ['requester', 'decider'],
    },
    avanceCaisse: {
      path: '/my-requests/avance-caisse',
      accessLevel: ['requester', 'decider'],
    },
    depenseCaisse: {
      path: '/my-requests/depense-caisse',
      accessLevel: ['requester', 'decider'],
    },
  },
};
