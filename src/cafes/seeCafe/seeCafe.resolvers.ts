import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Query: {
    seeCafe: protectedResolver(async (_, { id }, { client }) => {
      console.log(id);
      const cafe = await client.cafe.findUnique({ where: { id } });
      console.log(cafe);
      return cafe;
    }),
  },
};
