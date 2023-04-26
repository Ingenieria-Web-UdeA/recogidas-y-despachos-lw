import Layout from '@layouts/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@prisma/client';

const options = { method: 'GET', url: 'http://localhost:3000/api/users' };

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const result = await axios.request(options);
        setUsers(result.data.users);
        setLoading(false);
      } catch {
        // eslint-disable-next-line no-console
        console.log('error');
      }
    };

    getUsers();
  }, []);

  return (
    <Layout>
      <div className='flex w-full flex-col items-center gap-5 p-10'>
        <h1>User management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((el) => (
                <tr key={`user_${el.id}`}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default UsersPage;
