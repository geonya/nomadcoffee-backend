import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(async (_: any, { id }, { client }) => {
      const existingComment = await client.comment.findUnique({
        where: { id },
      });
      if (!existingComment) {
        return {
          ok: false,
          error: 'Not Found Comment',
        };
      }
      await client.comment.delete({ where: { id } });
      return {
        ok: true,
      };
    }),
  },
};
