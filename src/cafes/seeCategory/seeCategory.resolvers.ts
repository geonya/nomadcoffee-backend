import { CAFES_PER_ITEMS } from '../../constant';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Query: {
    seeCategory: protectedResolver(async (_, { slug }, { client }) =>
      client.cafe.findMany({
        where: {
          categories: {
            some: {
              slug,
            },
          },
        },
      })
    ),
  },
};
