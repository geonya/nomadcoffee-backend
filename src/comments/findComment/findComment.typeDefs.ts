import { gql } from 'apollo-server-express';

export default gql`
  type FindCommentReponse {
    ok: Boolean!
    error: String
    comment: Comment
  }
  type Query {
    findComment(cafeId: Int!): FindCommentReponse
  }
`;
