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
          let categoriesObjs: { name: string; slug: string }[] | null = null;
          if (categories) {
            categoriesObjs = categories.map(({ name }: { name: string }) => {
              const slug = name.replace(/ /g, '-').toLowerCase();
              return {
                where: { name },
                create: { name, slug },
              };
            });
          }
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

          if (files && files.length > 10)
            return {
              ok: false,
              error: "Can't not upload files more than 10",
            };

          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const url = await uploadToS3Bucket(
                files[i],
                loggedInUser.id,
                'photos'
              );
              await client.cafePhoto.create({
                data: {
                  cafe: {
                    connect: {
                      id: cafe.id,
                    },
                  },
                  user: {
                    connect: {
                      id: loggedInUser.id,
                    },
                  },
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
