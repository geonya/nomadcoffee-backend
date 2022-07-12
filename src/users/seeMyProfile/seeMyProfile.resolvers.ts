import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

export const resolvers: Resolvers = {
  Query: {
    seeMyProfile: protectedResolver(async (_, __, { loggedInUser, client }) =>
      client.user.findUnique({
        where: { id: loggedInUser.id },
      })
    ),
  },
};
