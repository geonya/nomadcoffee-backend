import { Resolvers } from '../types';

export const resolvers: Resolvers = {
	User: {
		cafes: ({ id }, _: any, { client }) =>
			client.cafe.findMany({ where: { userId: id } }),
		countCafes: ({ id }, _: any, { client }) =>
			client.cafe.count({ where: { userId: id } }),
		givenLikes: ({ id }, _: any, { client }) =>
			client.like.count({ where: { cafe: { userId: id } } }),
		totalFollowing: ({ id }, _: any, { client }) =>
			client.user.count({ where: { followers: { some: { id } } } }),
		totalFollowers: ({ id }, _: any, { client }) =>
			client.user.count({ where: { following: { some: { id } } } }),
	},
};
