import { gql } from "apollo-server-express";

export default gql`
	type User {
		id: Int!
		username: String!
		email: String!
		name: String!
		password: String!
		location: String
		avatarUrl: String
		githubUsername: String
		createdAt: String!
		updatedAt: String!
	}
`;
