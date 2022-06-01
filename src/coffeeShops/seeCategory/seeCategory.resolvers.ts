import client from "../../client";
import { SHOPS_PER_PAGE } from "../../constant";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export const resolvers: Resolvers = {
	Query: {
		seeCategory: protectedResolver(async (_, { name, page }) =>
			client.coffeeShop.findMany({
				where: {
					categories: {
						some: {
							name,
						},
					},
				},
				take: SHOPS_PER_PAGE,
				skip: page <= 0 ? 0 : (page - 1) * SHOPS_PER_PAGE,
			})
		),
	},
};
