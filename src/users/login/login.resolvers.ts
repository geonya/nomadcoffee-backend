import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
	Mutation: {
		login: async (_: any, { username, password }, { client }) => {
			const user = await client.user.findUnique({
				where: { username },
				select: { id: true, password: true },
			});
			if (!user)
				return {
					ok: false,
					error: "user not found!",
				};
			const passwordOk = await bcrypt.compare(password, user.password);
			if (!passwordOk)
				return {
					ok: false,
					error: "password wrong!",
				};
			const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token,
			};
		},
	},
};

export default resolvers;
