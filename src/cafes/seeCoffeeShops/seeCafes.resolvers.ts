import { CAFES_PER_PAGE } from '../../constant';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Query: {
		seeCafes: protectedResolver(async (_, { page }, { client }) =>
			client.cafe.findMany({
				take: CAFES_PER_PAGE,
				skip: page <= 0 ? 0 : (page - 1) * CAFES_PER_PAGE,
				orderBy: { createdAt: 'desc' },
			})
		),
	},
};
