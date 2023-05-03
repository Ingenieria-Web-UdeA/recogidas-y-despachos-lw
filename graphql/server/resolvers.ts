import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { Resolver } from 'types';

const resolvers: Resolver = {
  User: {
    role: async (parent, args, context) =>
      await context.db.role.findUnique({
        where: {
          id: parent.roleId,
        },
      }),
  },
  Collection: {
    year: async (parent, args, context) => {
      const collectionDate = new Date(parent.collectionDate);
      return collectionDate.getFullYear();
    },
    month: async (parent, args, context) => {
      const collectionDate = new Date(parent.collectionDate);
      return collectionDate.toLocaleString('default', { month: 'long' });
    },
    lot: async (parent, args, context) => {
      const { db } = context;

      const lot = await db.lot.findUnique({
        where: {
          id: parent.lotId,
        },
      });

      return lot;
    },
  },
  Query: {
    users: async (parent, args, context) => {
      const { db } = context;

      const users = await db.user.findMany();
      return users;
    },
    user: async (parent, args, context) => {
      const { db } = context;

      const user = await db.user.findFirst({
        where: {
          email: {
            equals: args.email,
          },
        },
      });

      return user;
    },
    collections: async (parent, args, context) => {
      const { db } = context;

      const collection = db.collection.findMany();

      return collection;
    },
    indicators: async (parent, args, context) => {
      const { session, db } = context;
      const userRole = await db.user.findUnique({
        where: {
          email: session?.user?.email ?? '',
        },
        include: {
          role: true,
        },
      });

      const role = userRole?.role?.name;

      if (role === 'Admin') {
        return [
          { id: 2, date: '2023-04-26', totalCollection: 10 },
          { id: 1, date: '2023-04-25', totalCollection: 25 },
        ];
      }

      return null;
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const { name, email, image } = args;
      const { db } = context;

      const newUser = await db.user.create({
        data: {
          email,
          name,
          image,
        },
      });

      return newUser;
    },
  },
};

export { resolvers };
