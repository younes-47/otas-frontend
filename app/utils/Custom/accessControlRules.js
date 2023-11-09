export const accessControlRules = {
  overview: {
    path: '/overview',
    accessLevel: [
      'admin',
      'minimal-access',
      'leader',
      'technicien-technique',
      'technicien',
    ],
  },
};
