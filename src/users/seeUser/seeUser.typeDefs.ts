import { gql } from 'apollo-server-express';

export default gql`
  type SeeUserResult {
    user: User
  }
  type Query {
    seeUser(username: String!): SeeUserResult
  }
`;
