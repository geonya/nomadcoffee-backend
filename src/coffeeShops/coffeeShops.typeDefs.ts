import { gql } from 'apollo-server-express';

export default gql`
	type CoffeeShop {
		id: Int!
		name: String!
		latitude: String
		longitude: String
		description: String
		user: User!
		photos: [CoffeeShopPhoto]
		categories: [Category]
		isLiked: Boolean!
		countLikes: Int!
		updatedAt: String!
		createdAt: String!
	}
	type CoffeeShopPhoto {
		id: Int!
		url: String!
		shop: CoffeeShop
	}
	type Category {
		id: Int!
		name: String!
		slug: String!
		shops: [CoffeeShop]
		totalShops: Int!
		updatedAt: String!
		createdAt: String!
	}
	type Like {
		id: Int!
		coffeeShop: CoffeeShop!
		updatedAt: String!
		createdAt: String!
	}
`;
