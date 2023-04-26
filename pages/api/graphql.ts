import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from 'graphql/server/resolvers';
import { typeDefs } from 'graphql/server/types';

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Context } from 'types';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const serverHandler = startServerAndCreateNextHandler<NextApiRequest, Context>(
  server,
  {
    context: async (req: NextApiRequest, res: NextApiResponse) => {
      const session = await getServerSession(req, res, authOptions);
      return {
        req,
        res,
        db: prisma,
        session,
      };
    },
  }
);

const graphQLServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (process.env.NODE_ENV === 'production' && !session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  await serverHandler(req, res);
};

export default graphQLServer;
