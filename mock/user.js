export default {
  'POST /api/v1/accounts/login': {
    data: {
      token: 'TTTTTT',
      expiresAt: new Date().getTime() + 2 * 60 * 60 * 1000,
    },
    code: 0,
    msg: '',
  },
  'GET /api/v1/todolists': {
    data: [
      {
        itemId: 8,
        description: 'day4',
        finished: false,
      },
      {
        itemId: 9,
        description: 'day5',
        finished: false,
      },
      {
        itemId: 10,
        description: 'day6',
        finished: false,
      },
    ],
    code: 0,
    msg: '',
  },
};
