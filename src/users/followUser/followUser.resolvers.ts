import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

export const resolvers: Resolvers = {
	Mutation: {
		followUser: protectedResolver(
			async (_, { username }, { loggedInUser, client }) => {
				const exsistingUser = await client.user.findUnique({
					where: { username },
					select: { id: true },
				});
				if (!exsistingUser)
					return {
						ok: false,
						error: "User not found.",
					};
				await client.user.update({
					where: {
						id: loggedInUser.id,
					},
					data: {
						following: {
							connect: {
								username,
							},
						},
					},
				});
				return { ok: true };
			}
		),
	},
};
