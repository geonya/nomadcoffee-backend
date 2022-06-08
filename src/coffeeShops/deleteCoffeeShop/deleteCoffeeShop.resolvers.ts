import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Mutation: {
		deleteCoffeeShop: protectedResolver(
			async (_, { id }, { client, loggedInUser }) => {
				const existingShop = await client.coffeeShop.findUnique({
					where: { id },
				});
				if (!existingShop)
					return {
						ok: false,
						error: 'Not found shop!',
					};
				else if (existingShop.userId !== loggedInUser.id)
					return {
						ok: false,
						error: 'Not Authorized!',
					};
				await client.coffeeShop.delete({ where: { id } });
				return {
					ok: true,
				};
			}
		),
	},
};
