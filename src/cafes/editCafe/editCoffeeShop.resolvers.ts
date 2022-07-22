import { uploadToS3Bucket } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

export const resolvers: Resolvers = {
  Mutation: {
    editCafe: protectedResolver(
      async (
        _,
        {
          id,
          name,
          files,
          address,
          categories,
          description,
          latitude,
          longitude,
          deleteIds,
        },
        { client, loggedInUser }
      ) => {
        try {
          const prevCafe = await client.cafe.findUnique({
            where: { id },
            select: { id: true, photos: true },
          });
          if (!prevCafe)
            return {
              ok: false,
              error: 'Not found cafe',
            };
          for (const id of deleteIds) {
            try {
              await client.cafePhoto.delete({ where: { id } });
              // TODO : AWS S3 버킷에서도 삭제
            } catch (error) {
              console.error(error);
              return {
                ok: false,
                error: "Can't Delete Photo",
              };
            }
          }
          let categoriesObjs: { name: string; slug: string }[] | null = null;
          if (files?.length > 10)
            return {
              ok: false,
              error: "Can't not upload files more than 10",
            };
          if (files?.length > 0) {
            for (const file of files) {
              const url = await uploadToS3Bucket(
                file,
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
          if (categories) {
            categoriesObjs = categories.map(({ name }: { name: string }) => {
              const slug = name.replace(/ /g, '-').toLowerCase();
              return {
                where: { name },
                create: { name, slug },
              };
            });
          }
          const cafe = await client.cafe.update({
            where: {
              id,
            },
            data: {
              name,
              description,
              address,
              latitude,
              longitude,
              ...(categories && {
                categories: { connectOrCreate: categoriesObjs },
              }),
            },
          });
          return {
            ok: true,
            cafe,
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
