import { gql } from "apollo-server-express";

export default gql`
	scalar Upload
	type Mutation {
		createCoffeeShop(
			name: String!
			files: [Upload]!
			latitude: String
			longitude: String
			categories: [CategoryInput]!
		): MutationResponse
	}
`;
