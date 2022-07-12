import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editProfile(
      username: String
      name: String
      email: String
      password: String
      avatar: Upload
      githubUsername: String
      address: String
    ): MutationResponse
  }
  scalar Upload
`;
