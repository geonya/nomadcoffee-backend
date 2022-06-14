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
		countLikes: ({ id }, _, { client }) =>
			client.like.count({ where: { coffeeShopId: id } }),
		isLiked: async ({ id }, _, { client, loggedInUser }) => {
			if (!loggedInUser) return false;
			const likeWhere = {
				coffeeShopId_userId: {
					coffeeShopId: id,
					userId: loggedInUser.id,
				},
			};
			const prevLike = await client.like.findUnique({ where: likeWhere });
			if (prevLike) return true;
			return false;
		},
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
