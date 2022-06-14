import { Resolvers } from '../types';

export const resolvers: Resolvers = {
	User: {
		countShops: async ({ id }, _: any, { client }) =>
			client.coffeeShop.count({ where: { userId: id } }),
	},
};
