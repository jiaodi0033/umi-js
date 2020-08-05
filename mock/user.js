export default {
  'POST /api/v1/accounts/login': {
    data: {
      token: 'TTTTTT',
      expiresAt: new Date().getTime() + 2 * 60 * 60 * 1000,
    },
    code: 0,
    msg: '',
  },
};
