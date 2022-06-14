import { gql } from 'apollo-server-express';

export default gql`
	type Cafe {
		id: Int!
		name: String!
		latitude: String
		longitude: String
		description: String
		user: User!
		photos: [CafePhoto]
		categories: [Category]
		isLiked: Boolean!
		countLikes: Int!
		updatedAt: String!
		createdAt: String!
	}
	type CafePhoto {
		id: Int!
		url: String!
		cafe: Cafe
	}
	type Category {
		id: Int!
		name: String!
		slug: String!
		cafes: [Cafe]
		totalCafes: Int!
		updatedAt: String!
		createdAt: String!
	}
	type Like {
		id: Int!
		cafe: Cafe!
		updatedAt: String!
		createdAt: String!
	}
`;
