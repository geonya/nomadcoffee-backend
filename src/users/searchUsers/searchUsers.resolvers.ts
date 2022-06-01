import { USERS_PER_PAGE } from "../../constant";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

export const resolver: Resolvers = {
	Query: {
		searchUsers: protectedResolver(async (_, { keyword, page }, { client }) => {
			if (keyword.length < 2)
				return {
					ok: false,
					error: "keyword length should be more than 2",
				};
			const users = await client.user.findMany({
				where: {
					OR: [
						{
							username: {
								startsWith: keyword,
								mode: "insensitive",
							},
						},
						{
							username: {
								contains: keyword,
								mode: "insensitive",
							},
						},
						{
							username: {
								endsWith: keyword,
								mode: "insensitive",
							},
						},
						{
							name: {
								startsWith: keyword,
								mode: "insensitive",
							},
						},
						{
							name: {
								contains: keyword,
								mode: "insensitive",
							},
						},
						{
							name: {
								endsWith: keyword,
								mode: "insensitive",
							},
						},
					],
				},
				take: USERS_PER_PAGE,
				skip: (page - 1) * USERS_PER_PAGE,
			});
			if (!users || users.length === 0) {
				return {
					ok: false,
					error: "users not found",
				};
			}
			return {
				ok: true,
				totalPages: Math.ceil(users.length / USERS_PER_PAGE),
			};
		}),
	},
};
