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

      const collections = await db.collection.findMany({});

      return collections;
    },
    filterCollections: async (parent, args, context) => {
      const { db } = context;
      const { month, year } = args;
      const { initalDate, finalDate } = getMonthStartEndDates({ month, year });

      const filteredCollections = await db.collection.findMany({
        where: {
          AND: [
            {
              collectionDate: {
                gte: initalDate,
              },
            },
            {
              collectionDate: {
                lt: finalDate,
              },
            },
          ],
        },
        orderBy: [
          {
            collectionDate: 'asc',
          },
          {
            lot: {
              index: 'asc',
            },
          },
        ],
      });

      return filteredCollections;
    },
    filterShipments: async (parent, args, context) => {
      const { db } = context;
      const { month, year } = args;
      const { initalDate, finalDate } = getMonthStartEndDates({
        month,
        year,
      });

      const filteredShipments = await db.shipment.findMany({
        where: {
          AND: [
            {
              shipmentDate: {
                gte: initalDate,
              },
            },
            {
              shipmentDate: {
                lt: finalDate,
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return filteredShipments;
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
    lots: async (parent, args, context) => {
      const { db } = context;

      const lots = await db.lot.findMany();

      return lots;
    },
    getCollectionsByMonth: async (parent, args, context) => {
      const { db } = context;
      const { initYear, initMonth, finalYear, finalMonth } = args;

      const initialDate = new Date(initYear, initMonth, 0);
      const finalDate = new Date(finalYear, finalMonth + 1, 0);

      const response = await db.$queryRaw`
      select 
      concat(year,'-',month) as "monthYear",
      lot,
      "totalBunches" 
      from monthly_collections
     where date between ${initialDate} and ${finalDate}
      order by date asc
      `;

      // console.log(response);

      return response;
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
    createCollection: async (parent, args, context) => {
      const { db, session } = context;

      const newCollection = await db.collection.upsert({
        where: {
          collectionDate_lotId: {
            collectionDate: new Date(args.collectionDate),
            lotId: args.lot,
          },
        },
        update: {
          bunches: args.bunches,
        },
        create: {
          bunches: args.bunches,
          collectionDate: new Date(args.collectionDate),
          lot: {
            connect: {
              id: args.lot,
            },
          },
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
            },
          },
        },
      });

      return newCollection;
    },
    createShipment: async (parent, args, context) => {
      const { db, session } = context;

      const newShipment = await db.shipment.create({
        data: {
          shippedBunches: args.shippedBunches,
          shipmentDate: new Date(args.shipmentDate),
          deliveredWeight: args.deliveredWeight,
          bunchWeight: args.deliveredWeight / args.shippedBunches,
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
            },
          },
        },
      });

      return newShipment;
    },
  },
};

interface GetMonthStartEndDatesProps {
  month: number;
  year: number;
}

const getMonthStartEndDates = ({ month, year }: GetMonthStartEndDatesProps) => {
  const initalDate = new Date(year, month, 1, -5, 0, 0);
  const finalDate = new Date(year, month + 1, 1, -5, 0, 0);

  return { initalDate, finalDate };
};

export { resolvers };
