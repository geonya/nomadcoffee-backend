import { uploadToS3Bucket } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Mutation: {
		editCoffeeShop: protectedResolver(
			async (
				_,
				{ id, name, files, latitude, longitude, categories, description },
				{ client, loggedInUser }
			) => {
				try {
					if (files?.length > 10)
						return {
							ok: false,
							error: "Can't not upload files more than 10",
						};
					if (files?.length > 0) {
						for (let i = 0; i < files.length; i++) {
							const url = await uploadToS3Bucket(
								files[i],
								loggedInUser.id,
								'photos'
							);
							await client.coffeeShopPhoto.create({
								data: {
									coffeeShopId: id,
									userId: loggedInUser.id,
									url,
								},
							});
						}
					}
					let categoriesObjs = null;
					if (categories) {
						categoriesObjs = categories.map(
							(category: { name: string; slug: string }) => ({
								where: { name: category.name },
								create: { name: category.name, slug: category.slug },
							})
						);
					}
					const coffeeShop = await client.coffeeShop.update({
						where: {
							id,
						},
						data: {
							name,
							description,
							latitude,
							longitude,
							...(categories && {
								categories: { connectOrCreate: categoriesObjs },
							}),
						},
					});
					return {
						ok: true,
						coffeeShop,
					};
				} catch (error) {
					console.error(error);
					return {
						ok: false,
						error: "Can't Edit Data",
					};
				}
			}
		),
	},
};
