import { gql } from 'apollo-server-express';

export default gql`
	type DeleteCoffeeShopResult {
		ok: Boolean!
		error: String
		coffeeShop: CoffeeShop
	}
	type Mutation {
		deleteCoffeeShop(id: Int!): DeleteCoffeeShopResult!
	}
`;
