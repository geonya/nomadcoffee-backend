import { USERS_PER_PAGE } from '../../constant';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    seeUser: protectedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        const foundUser = await client.user.findUnique({
          where: { username },
          // include: {
          // 	followers: {
          // 		take: USERS_PER_PAGE,
          // 		skip: (page - 1) * USERS_PER_PAGE,
          // 	},
          // 	following: {
          // 		take: USERS_PER_PAGE,
          // 		skip: (page - 1) * USERS_PER_PAGE,
          // 	},
          // },
        });
        if (!foundUser) return { user: null };
        return {
          user: foundUser,
        };
      }
    ),
  },
};

export default resolvers;
