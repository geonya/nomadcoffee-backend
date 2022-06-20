import { uploadToS3Bucket } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
	Mutation: {
		createCafe: protectedResolver(
			async (
				_,
				{ name, files, latitude, longitude, categories, description },
				{ loggedInUser, client }
			) => {
				try {
					const categoriesObjs = categories.map(
						(category: { name: string; slug: string }) => ({
							where: { name: category.name },
							create: { name: category.name, slug: category.slug },
						})
					);
					const cafe = await client.cafe.create({
						data: {
							name,
							user: {
								connect: {
									id: loggedInUser.id,
								},
							},
							description,
							longitude,
							latitude,
							...(categories && {
								categories: { connectOrCreate: categoriesObjs },
							}),
						},
					});
					if (files.length > 10)
						return {
							ok: false,
							error: "Can't not upload files more than 10",
						};

					if (files.length > 0) {
						for (let i = 0; i < files.length; i++) {
							const url = await uploadToS3Bucket(
								files[i],
								loggedInUser.id,
								'photos'
							);
							await client.cafePhoto.create({
								data: {
									cafeId: cafe.id,
									userId: loggedInUser.id,
									url,
								},
							});
						}
					}
					return {
						ok: true,
						cafe,
					};
				} catch (err) {
					console.error(err);
					return {
						ok: false,
						error: "can't create cafe",
					};
				}
			}
		),
	},
};