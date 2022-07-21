import { Resolvers } from '../../types';

export const resolvers: Resolvers = {
  Query: {
    searchCafes: async (_: any, { keyword }, { client }) => {
      return client.cafe.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: keyword,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              name: {
                endsWith: keyword,
                mode: 'insensitive',
              },
            },
            {
              categories: {
                some: {
                  name: {
                    startsWith: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              categories: {
                some: {
                  name: {
                    endsWith: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              user: {
                username: {
                  startsWith: keyword,
                  mode: 'insensitive',
                },
              },
            },
            {
              user: {
                username: {
                  endsWith: keyword,
                  mode: 'insensitive',
                },
              },
            },
            {
              user: {
                username: {
                  contains: keyword,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
      });
    },
  },
};
