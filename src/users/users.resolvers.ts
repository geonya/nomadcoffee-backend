import { Resolvers } from '../types';

export const resolvers: Resolvers = {
	User: {
		countShops: async ({ id }, _: any, { client }) =>
			client.coffeeShop.count({ where: { userId: id } }),
		givenLikes: async ({ id }, _: any, { client }) =>
			client.like.count({ where: { coffeeShop: { userId: id } } }),
		totalFollowing: async ({ id }, _: any, { client }) =>
			client.user.count({ where: { followers: { some: { id } } } }),
		totalFollowers: async ({ id }, _: any, { client }) =>
			client.user.count({ where: { following: { some: { id } } } }),
	},
};
