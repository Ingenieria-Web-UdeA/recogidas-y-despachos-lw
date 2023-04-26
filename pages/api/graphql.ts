import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from 'graphql/server/resolvers';
import { typeDefs } from 'graphql/server/types';

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Context } from 'types';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler<NextApiRequest, Context>(
  server,
  {
    context: async (req: NextApiRequest, res: NextApiResponse) => ({
      req,
      res,
      db: prisma,
    }),
  }
);
