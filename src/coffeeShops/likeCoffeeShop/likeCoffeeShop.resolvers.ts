import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Mutation: {
		toggleLike: protectedResolver(
			async (_, { id }, { client, loggedInUser }) => {
				const existingCoffeShop = await client.coffeeShop.findUnique({
					where: { id },
				});
				if (!existingCoffeShop) {
					return {
						ok: false,
						error: 'Not found coffeeShop',
					};
				}
				const likeWhere = {
					coffeeShopId_userId: {
						coffeeShopId: id,
						userId: loggedInUser.id,
					},
				};
				const existingLike = await client.like.findUnique({
					where: likeWhere,
				});
				if (existingLike) {
					await client.like.delete({ where: likeWhere });
				} else {
					await client.like.create({
						data: {
							user: {
								connect: {
									id: loggedInUser.id,
								},
							},
							coffeeShop: {
								connect: {
									id,
								},
							},
						},
					});
				}
				return {
					ok: true,
				};
			}
		),
	},
};
