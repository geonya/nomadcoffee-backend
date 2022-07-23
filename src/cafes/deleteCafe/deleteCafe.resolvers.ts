import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    deleteCafe: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const existingCafe = await client.cafe.findUnique({
          where: { id },
        });
        if (!existingCafe) {
          return {
            ok: false,
            error: 'Not found cafe!',
          };
        }
        if (existingCafe.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: 'Not Authorized!',
          };
        }
        await client.cafe.delete({ where: { id } });
        return {
          ok: true,
          id,
        };
      }
    ),
  },
};
