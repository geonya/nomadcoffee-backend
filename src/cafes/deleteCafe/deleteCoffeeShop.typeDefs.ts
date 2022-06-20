import { gql } from 'apollo-server-express';

export default gql`
	type Mutation {
		deleteCafe(id: Int!): MutationResponse!
	}
`;
