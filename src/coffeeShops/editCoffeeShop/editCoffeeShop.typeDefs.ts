import { gql } from 'apollo-server-express';

export default gql`
	type EditCoffeeShopResult {
		ok: Boolean!
		error: String
		coffeeShop: CoffeeShop
	}
	type Mutation {
		editCoffeeShop(
			id: Int!
			name: String
			files: [Upload]
			latitude: String
			longitude: String
			description: String
			categories: [CategoryInput]
		): EditCoffeeShopResult!
	}
`;
