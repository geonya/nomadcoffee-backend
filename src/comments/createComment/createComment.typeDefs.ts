import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createComment(
      caption: String!
      rating: Int!
      cafeId: Int!
    ): MutationResponse
  }
`;
