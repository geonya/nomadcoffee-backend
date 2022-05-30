import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

export const resolvers: Resolvers = {
	Mutation: {
		unFollowUser: protectedResolver(
			async (_, { username }, { loggedInUser, client }) => {
				const existingUser = client.user.findUnique({
					where: {
						username,
					},
					select: { id: true },
				});
				if (!existingUser)
					return {
						ok: false,
						error: "user not found",
					};
				await client.user.update({
					where: { id: loggedInUser.id },
					data: { following: { disconnect: { username } } },
				});
				return {
					ok: true,
				};
			}
		),
	},
};
