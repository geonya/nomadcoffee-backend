import client from '../../client';
import { CAFES_PER_PAGE } from '../../constant';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Query: {
		seeCategory: protectedResolver(async (_, { name, page }) =>
			client.cafe.findMany({
				where: {
					categories: {
						some: {
							name,
						},
					},
				},
				take: CAFES_PER_PAGE,
				skip: page <= 0 ? 0 : (page - 1) * CAFES_PER_PAGE,
			})
		),
	},
};
