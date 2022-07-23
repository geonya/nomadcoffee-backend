import { gql } from 'apollo-server-express';

export default gql`
  type DeleteCafeResult {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    deleteCafe(id: Int!): DeleteCafeResult
  }
`;
