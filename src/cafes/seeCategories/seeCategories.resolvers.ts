import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export const resolvers: Resolvers = {
	Query: {
		seeCategories: protectedResolver(async (_, __, { client }) =>
			client.category.findMany()
		),
	},
};
