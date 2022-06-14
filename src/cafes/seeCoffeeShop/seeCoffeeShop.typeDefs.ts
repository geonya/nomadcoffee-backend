import { gql } from 'apollo-server-express';

export default gql`
	type Query {
		seeCafe(id: Int!): Cafe
	}
`;
