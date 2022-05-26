import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import * as bcrypt from "bcrypt";
import { uploadToS3Bucket } from "../../shared/shared.utils";

const resolvers: Resolvers = {
	Mutation: {
		editProfile: protectedResolver(
			async (
				_,
				{
					username,
					name,
					email,
					password: newPassword,
					avatar,
					location,
					githubUsername,
				},
				{ loggedInUser, client }
			) => {
				let avatarUrl = "";
				if (avatar) {
					avatarUrl = await uploadToS3Bucket(
						avatar,
						loggedInUser.id,
						"avatars"
					);
				}
				let hashedPassword = "";
				if (newPassword) {
					hashedPassword = await bcrypt.hash(newPassword, 10);
				}
				const updatedUser = await client.user.update({
					where: {
						id: loggedInUser.id,
					},
					data: {
						username,
						name,
						email,
						location,
						githubUsername,
						...(avatar && { avatarUrl }),
						...(newPassword && { password: hashedPassword }),
					},
					select: {
						id: true,
					},
				});
				if (updatedUser) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "Could not update profile.",
					};
				}
			}
		),
	},
};

export default resolvers;
