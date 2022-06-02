import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

export const resolvers: Resolvers = {
	Mutation: {
		createAccount: async (
			_: any,
			{ username, name, email, password },
			{ client }
		) => {
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [{ username }, { email }],
					},
				});
				if (existingUser) {
					return {
						ok: false,
						error: "Username or Email is already taken.",
					};
				}
				const hashedPassword = await bcrypt.hash(password, 10);

				await client.user.create({
					data: {
						username,
						name,
						email,
						password: hashedPassword,
					},
				});
				return {
					ok: true,
				};
			} catch (err) {
				console.error(err);
				return {
					ok: false,
					error: "Can't create Account",
				};
			}
		},
	},
};
