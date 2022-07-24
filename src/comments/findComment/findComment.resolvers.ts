import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Query: {
    findComment: protectedResolver(
      async (_: any, { cafeId }, { client, loggedInUser }) => {
        const cafe = await client.cafe.findUnique({ where: { id: cafeId } });
        if (!cafe) {
          return {
            ok: false,
            error: 'Not found Cafe',
          };
        }
        const commentWhere = {
          cafeId_userId: {
            cafeId,
            userId: loggedInUser.id,
          },
        };
        const comment = await client.comment.findUnique({
          where: commentWhere,
        });
        if (!comment) {
          return {
            ok: false,
            error: 'Not found Comment',
          };
        }
        return {
          ok: true,
          comment,
        };
      }
    ),
  },
};
