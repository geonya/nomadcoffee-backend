import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Query: {
    seeCafes: protectedResolver(async (_, __, { client }) =>
      client.cafe.findMany({
        orderBy: { createdAt: 'desc' },
      })
    ),
  },
};
