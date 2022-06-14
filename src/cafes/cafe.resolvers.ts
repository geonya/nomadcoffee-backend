import { Resolvers } from '../types';

export const resolvers: Resolvers = {
	Cafe: {
		user: async ({ userId }, _: any, { client }) =>
			client.user.findUnique({ where: { id: userId } }),
		photos: async ({ id }, _, { client }) =>
			client.cafePhoto.findMany({ where: { cafeId: id } }),
		categories: async ({ id }, _, { client }) =>
			client.category.findMany({
				where: {
					cafes: { some: { id } },
				},
			}),
		countLikes: async ({ id }, _, { client }) =>
			client.like.count({ where: { cafeId: id } }),
		isLiked: async ({ id }, _, { client, loggedInUser }) => {
			if (!loggedInUser) return false;
			const likeWhere = {
				cafeId_userId: {
					cafeId: id,
					userId: loggedInUser.id,
				},
			};
			const prevLike = await client.like.findUnique({ where: likeWhere });
			if (prevLike) return true;
			return false;
		},
	},
	Category: {
		totalCafes: async ({ id }, _, { client }) =>
			client.cafe.count({
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
