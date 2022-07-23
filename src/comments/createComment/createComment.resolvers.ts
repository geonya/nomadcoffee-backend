import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { caption, rating, cafeId }, { client, loggedInUser }) => {
        try {
          const cafe = await client.cafe.findUnique({
            where: {
              id: cafeId,
            },
            select: {
              id: true,
            },
          });
          if (!cafe)
            return {
              ok: false,
              error: 'Not found cafe',
            };
          const commentWhere = {
            cafeId_userId: {
              cafeId,
              userId: loggedInUser.id,
            },
          };
          const existingComment = await client.comment.findUnique({
            where: commentWhere,
          });
          if (existingComment) {
            await client.comment.update({
              where: {
                id: existingComment.id,
              },
              data: {
                caption,
                rating,
              },
            });
          } else {
            await client.comment.create({
              data: {
                caption,
                rating,
                user: {
                  connect: {
                    id: loggedInUser.id,
                  },
                },
                cafe: {
                  connect: {
                    id: cafeId,
                  },
                },
              },
            });
          }
          return {
            ok: true,
          };
        } catch (error) {
          console.error(error);
          return {
            ok: false,
            error,
          };
        }
      }
    ),
  },
};
