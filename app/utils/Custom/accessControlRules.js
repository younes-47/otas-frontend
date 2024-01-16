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
    liquidation: {
      path: '/my-requests/liquidation',
      accessLevel: ['requester', 'decider'],
    },
  },
  decideOnRequests: {
    path: '/decide-on-requests',
    accessLevel: ['decider'],
    decideOnOrdreMission: {
      path: '/decide-on-requests/decide-on-ordre-mission',
      accessLevel: ['decider'],
    },
    decideOnAvanceVoyage: {
      path: '/decide-on-requests/decide-on-avance-voyage',
      accessLevel: ['decider'],
    },
    decideOnAvanceCaisse: {
      path: '/decide-on-requests/decide-on-avance-caisse',
      accessLevel: ['decider'],
    },
    decideOnDepenseCaisse: {
      path: '/decide-on-requests/decide-on-depense-caisse',
      accessLevel: ['decider'],
    },
    decideOnLiquidation: {
      path: '/decide-on-requests/decide-on-liquidation',
      accessLevel: ['decider'],
    },
  },
};
