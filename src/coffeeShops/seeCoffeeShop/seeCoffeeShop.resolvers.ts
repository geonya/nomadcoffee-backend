import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Query: {
		seeCoffeeShop: protectedResolver(async (_, { id }, { client }) =>
			client.coffeeShop.findUnique({ where: { id } })
		),
	},
};
