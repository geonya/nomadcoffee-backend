import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    createCategory: protectedResolver(async (_, { name }, { client }) => {
      const existingCategory = await client.category.findFirst({
        where: { name },
      });
      if (existingCategory)
        return {
          ok: false,
          error: 'Already Exist',
        };
      const slug = name.replace(/ /g, '-').toLowerCase();
      await client.category.create({ data: { name, slug } });
      return {
        ok: true,
      };
    }),
  },
};
