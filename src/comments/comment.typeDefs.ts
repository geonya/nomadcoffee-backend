import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: Int!
    updatedAt: String!
    createdAt: String!
    caption: String!
    rating: Int!
    user: User
    cafe: Cafe
  }
`;
