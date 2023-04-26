import { useQuery } from '@apollo/client';
import Layout from '@layouts/Layout';
import { User } from '@prisma/client';
import { GET_USERS } from 'graphql/client/user';

const UsersPage = () => {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((el) => (
                <tr key={`user_${el.email}`}>
                  <td>{el.id}</td>
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
