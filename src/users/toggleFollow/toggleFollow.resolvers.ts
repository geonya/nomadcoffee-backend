import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

export const resolvers: Resolvers = {
	Mutation: {
		toggleFollow: protectedResolver(
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
				const isFollowing = await client.user.findFirst({
					where: { id: loggedInUser.id, following: { some: { username } } },
					select: { id: true },
				});
				if (!isFollowing) {
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
				} else {
					await client.user.update({
						where: { id: loggedInUser.id },
						data: { following: { disconnect: { username } } },
					});
				}
				return { ok: true };
			}
		),
	},
};
