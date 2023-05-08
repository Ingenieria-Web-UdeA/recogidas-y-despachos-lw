import { Collection, Lot, PrismaClient, Role, User } from '@prisma/client';
import { Session } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next/types';

export interface Context {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  session: Session | null;
}

interface ResolverFunction {
  [key: string]: (parent: any, args: any, context: Context) => Promise<any>;
}

export interface Resolver {
  Query: ResolverFunction;
  Mutation: ResolverFunction;
  [key: string]: ResolverFunction;
}

export interface ExtendedUser extends User {
  role: Role;
}

export interface ExtendedCollection extends Collection {
  lot: Lot;
}
