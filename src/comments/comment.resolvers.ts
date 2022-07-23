import { Resolvers } from '../types';

export const resolvers: Resolvers = {
  Comment: {
    user: async ({ userId }, _: any, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    cafe: async ({ CafeId }, _: any, { client }) =>
      client.cafe.findUnique({ where: { id: CafeId } }),
  },
};
