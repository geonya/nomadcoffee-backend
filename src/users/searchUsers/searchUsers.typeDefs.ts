import { gql } from "apollo-server-express";

export default gql`
	type Query {
		searchUsers(keyword: String!, page: Int!): SearchUserResult
	}
	type SearchUserResult {
		ok: Boolean!
		error: String
		totalPages: Int
	}
`;
