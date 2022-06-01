import { SHOPS_PER_PAGE } from "../../constant";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export const resolvers: Resolvers = {
	Query: {
		seeCoffeeShops: protectedResolver(async (_, { page }, { client }) =>
			client.coffeeShop.findMany({
				take: SHOPS_PER_PAGE,
				skip: page <= 0 ? 0 : (page - 1) * SHOPS_PER_PAGE,
			})
		),
	},
};
