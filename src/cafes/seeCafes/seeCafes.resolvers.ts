import { CAFES_PER_PAGE } from '../../constant';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Query: {
		seeCafes: protectedResolver(
			async (_, { offset }, { client, loggedInUser }) =>
				client.cafe.findMany({
					take: CAFES_PER_PAGE,
					skip: offset,
					orderBy: { createdAt: 'desc' },
				})
		),
	},
};
