import { gql } from 'apollo-server-express';

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
		following: [User]
		totalFollowing: Int!
		followers: [User]
		totalFollowers: Int!
		shops: [CoffeeShop]
		countShops: Int!
		givenLikes: Int!
		photos: [CoffeeShopPhoto]
		createdAt: String!
		updatedAt: String!
	}
`;
