import { gql } from 'apollo-server-express';

export default gql`
	type Mutation {
		editCoffeeShop(
			id: Int!
			name: String
			files: [Upload]
			latitude: String
			longitude: String
			description: String
			categories: [CategoryInput]
		): MutationResponse
	}
`;
