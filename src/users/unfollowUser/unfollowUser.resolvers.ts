import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_: any, { username }, { client, loggedInUser }) => {
        const opponent = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!opponent)
          return {
            ok: false,
            error: 'user not found',
          };
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};
