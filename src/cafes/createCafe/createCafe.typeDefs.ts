import { gql } from 'apollo-server-express';

export default gql`
	type createCafeResult {
		ok: Boolean!
		error: String
		cafe: Cafe
	}
	scalar Upload
	type Mutation {
		createCafe(
			name: String!
			files: [Upload]!
			latitude: String
			longitude: String
			description: String
			categories: [CategoryInput]!
		): createCafeResult!
	}
`;
