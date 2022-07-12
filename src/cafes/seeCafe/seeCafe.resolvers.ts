import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Query: {
		seeCafe: protectedResolver(async (_, { id }, { client }) =>
			client.cafe.findUnique({ where: { id } })
		),
	},
};
