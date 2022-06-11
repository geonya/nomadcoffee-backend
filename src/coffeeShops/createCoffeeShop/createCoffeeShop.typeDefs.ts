import { gql } from 'apollo-server-express';

export default gql`
	type createCoffeeShopResult {
		ok: Boolean!
		error: String
		result: CoffeeShop
	}
	scalar Upload
	type Mutation {
		createCoffeeShop(
			name: String!
			files: [Upload]!
			latitude: String
			longitude: String
			description: String
			categories: [CategoryInput]!
		): createCoffeeShopResult!
	}
`;
