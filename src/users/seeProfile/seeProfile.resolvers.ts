import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
	Query: {
		seeProfile: protectedResolver(async (_: any, { username }, { client }) =>
			client.user.findUnique({ where: { username } })
		),
	},
};
export default resolvers;