import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editCafe(
      id: Int!
      name: String
      files: [Upload]
      address: String
      description: String
      categories: [CategoryInput]
    ): MutationResponse!
  }
`;
