import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const existingCafe = await client.cafe.findUnique({
          where: { id },
        });
        if (!existingCafe) {
          return {
            ok: false,
            error: 'Not found cafe',
          };
        }
        const likeWhere = {
          cafeId_userId: {
            cafeId: id,
            userId: loggedInUser.id,
          },
        };
        const existingLike = await client.like.findUnique({
          where: likeWhere,
        });
        if (existingLike) {
          await client.like.delete({ where: likeWhere });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              cafe: {
                connect: {
                  id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
