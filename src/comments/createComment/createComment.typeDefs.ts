import { gql } from 'apollo-server-express';

export default gql`
  type CreateCommentResponse {
    ok: Boolean!
    error: String
    comment: Comment
  }
  type Mutation {
    createComment(
      caption: String!
      rating: Int!
      cafeId: Int!
    ): CreateCommentResponse
  }
`;
