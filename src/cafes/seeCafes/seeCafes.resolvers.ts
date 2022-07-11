import { CAFES_PER_ITEMS } from '../../constant';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Query: {
    seeCafes: protectedResolver(async (_, { offset }, { client }) =>
      client.cafe.findMany({
        take: CAFES_PER_ITEMS,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      })
    ),
  },
};
