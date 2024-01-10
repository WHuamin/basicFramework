import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/test',
    method: 'get',
    response: () => {
      return {
        'list|1-10': [
          {
            'id|+1': 1,
          },
        ],
      };
    },
  },
] as MockMethod[];
