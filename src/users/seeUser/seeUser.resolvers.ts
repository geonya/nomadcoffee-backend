import { USERS_PER_PAGE } from "../../constant";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
	Query: {
		seeUser: protectedResolver(async (_, { username, page }, { client }) => {
			if (page < 1)
				return {
					ok: false,
					error: "page number must be more than 1",
				};
			const foundUser = await client.user.findUnique({
				where: { username },
				include: {
					followers: {
						take: USERS_PER_PAGE,
						skip: (page - 1) * USERS_PER_PAGE,
					},
					following: {
						take: USERS_PER_PAGE,
						skip: (page - 1) * USERS_PER_PAGE,
					},
				},
			});
			if (!foundUser.id)
				return {
					ok: false,
					error: "user not found",
				};
			return foundUser;
		}),
	},
};

export default resolvers;
