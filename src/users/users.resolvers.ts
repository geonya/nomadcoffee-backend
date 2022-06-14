import { Resolvers } from '../types';

export const resolvers: Resolvers = {
	User: {
		countCafes: async ({ id }, _: any, { client }) =>
			client.cafe.count({ where: { userId: id } }),
		givenLikes: async ({ id }, _: any, { client }) =>
			client.like.count({ where: { cafe: { userId: id } } }),
		totalFollowing: async ({ id }, _: any, { client }) =>
			client.user.count({ where: { followers: { some: { id } } } }),
		totalFollowers: async ({ id }, _: any, { client }) =>
			client.user.count({ where: { following: { some: { id } } } }),
	},
};
