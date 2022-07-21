import { Resolvers } from '../types';

export const resolvers: Resolvers = {
  User: {
    cafes: ({ id }, _: any, { client }) =>
      client.cafe.findMany({
        where: { userId: id },
        orderBy: { createdAt: 'desc' },
      }),
    countCafes: ({ id }, _: any, { client }) =>
      client.cafe.count({ where: { userId: id } }),
    givenLikes: ({ id }, _: any, { client }) =>
      client.like.count({ where: { cafe: { userId: id } } }),
    totalFollowing: ({ id }, _: any, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }, _: any, { client }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, _: any, { loggedInUser }) => id === loggedInUser.id,
    isFollowing: async ({ id }, _: any, { client, loggedInUser }) => {
      const user = await client.user.findFirst({
        where: { id, followers: { some: { id: loggedInUser.id } } },
      });
      if (user) {
        return true;
      } else {
        return false;
      }
    },
  },
};
