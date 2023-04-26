import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (session) {
    router.push('/app');
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-5'>
      <h1 className='text-4xl'>Sistema de recogidas y despachos</h1>
      <span className='w-96'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero ullam
        odio asperiores itaque magni delectus ipsum repudiandae voluptatibus,
        provident illum quas quo ab nesciunt qui voluptas quod maiores eum
        accusantium.
      </span>
      <button type='button' onClick={() => signIn('auth0')}>
        Log in
      </button>
    </div>
  );
};

export default IndexPage;
