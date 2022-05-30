import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
	Query: {
		seeMyProfile: protectedResolver(async (_, __, { loggedInUser, client }) =>
			client.user.findUnique({ where: { username: loggedInUser.username } })
		),
	},
};
export default resolvers;
