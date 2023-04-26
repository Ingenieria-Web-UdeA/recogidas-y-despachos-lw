// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// type Data = {
//   name: string;
//   email: string;
// };

const usersEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // obtener los usuarios y devolverlos en el response.
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } else if (req.method === 'POST') {
    const { body } = req;
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    res.status(201).json({ newUser });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default usersEndpoint;
