import { gql } from 'apollo-server-express';

export default gql`
	type Mutation {
		createCategory(name: String!, slug: String!): MutationResponse!
	}
`;
