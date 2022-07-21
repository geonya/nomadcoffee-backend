import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    password: String!
    address: String
    avatarUrl: String
    githubUsername: String
    isMe: Boolean
    isFollowing: Boolean
    following: [User]
    totalFollowing: Int!
    followers: [User]
    totalFollowers: Int!
    cafes: [Cafe]
    countCafes: Int!
    givenLikes: Int!
    photos: [CafePhoto]
    createdAt: String!
    updatedAt: String!
  }
`;
