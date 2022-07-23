import { gql } from 'apollo-server-express';

export default gql`
  type EditCafeResponse {
    ok: Boolean!
    error: String
    cafe: Cafe
  }
  type Mutation {
    editCafe(
      id: Int!
      name: String
      files: [Upload]
      address: String
      latitude: Float
      longitude: Float
      description: String
      categories: [CategoryInput]
      deleteIds: [Int]
    ): EditCafeResponse!
  }
`;
