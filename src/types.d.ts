import { PrismaClient, User } from '@prisma/client';

type Context = {
  loggedInUser: User;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

type PartialRecord<K extends string, T> = { [P in K]?: T };

type ResolverOperationType =
  | 'Query'
  | 'Mutation'
  | 'Subscription'
  | 'Upload'
  | 'Cafe'
  | 'Category'
  | 'CafePhoto'
  | 'User'
  | 'Comment';

export interface IResolver {
  [key: string]: Resolver;
}

export type Resolvers = PartialRecord<ResolverOperationType, IResolver>;
