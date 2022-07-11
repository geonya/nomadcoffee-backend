import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeCafes(offset: Int!): [Cafe]
  }
`;
