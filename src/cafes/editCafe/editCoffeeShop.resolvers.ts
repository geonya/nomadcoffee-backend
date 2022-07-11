import { uploadToS3Bucket } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    editCafe: protectedResolver(
      async (
        _,
        { id, name, files, address, categories, description },
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
              await client.cafePhoto.create({
                data: {
                  cafeId: id,
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
          await client.cafe.update({
            where: {
              id,
            },
            data: {
              name,
              description,
              address,
              ...(categories && {
                categories: { connectOrCreate: categoriesObjs },
              }),
            },
          });
          return {
            ok: true,
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
