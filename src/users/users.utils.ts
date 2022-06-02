import { Resolver } from "../types";
import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: string) => {
	try {
		if (!token) return null;
		const verifiedToken: string | jwt.JwtPayload = jwt.verify(
			token,
			process.env.SECRET_KEY!
		);
		if (typeof verifiedToken !== "string") {
			const user = await client.user.findUnique({
				where: { id: verifiedToken.id },
				select: { id: true },
			});
			if (user) return user;
			return null;
		} else {
			return null;
		}
	} catch (err) {
		console.error("getUser Error : ", err);
		return null;
	}
};

export const protectedResolver =
	(ourResolver: Resolver) =>
	(root: any, args: any, context: any, info: any) => {
		if (!context.loggedInUser) {
			const isQueries = info.operation.operation === "query";
			if (isQueries) {
				return null;
			} else {
				return {
					ok: false,
					error: "You need to login!",
				};
			}
		}
		return ourResolver(root, args, context, info);
	};
