import { Resolvers } from '../types';

export const resolvers: Resolvers = {
	CoffeeShop: {
		user: ({ userId }, _: any, { client }) =>
			client.user.findUnique({ where: { id: userId } }),
		photos: ({ id }, _, { client }) =>
			client.coffeeShopPhoto.findMany({ where: { coffeeShopId: id } }),
		categories: ({ id }, _, { client }) =>
			client.category.findMany({
				where: {
					shops: { some: { id } },
				},
			}),
	},
	Category: {
		totalShops: ({ id }, _, { client }) =>
			client.coffeeShop.count({
				where: {
					categories: {
						some: {
							id,
						},
					},
				},
			}),
	},
};
