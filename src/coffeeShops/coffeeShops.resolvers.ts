import { Resolvers } from "../types";

export const resolvers: Resolvers = {
	CoffeeShop: {
		photos: ({ id }, _, { client }) =>
			client.coffeeShopPhoto.findMany({ where: { coffeeShopId: id } }),
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
