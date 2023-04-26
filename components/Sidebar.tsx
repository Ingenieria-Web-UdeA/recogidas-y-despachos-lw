import { useNavigationContext } from '@context/navigationContext';
import { signOut } from 'next-auth/react';
import React from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import PrivateComponent from './PrivateComponent';
import Link from 'next/link';

const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useNavigationContext();
  return (
    <aside
      className={`sidebar-mobile sidebar-dekstop ${
        openSidebar ? 'flex' : 'hidden'
      } w-64 flex-col justify-between bg-gray-800 p-4 text-white lg:flex`}
    >
      <div className='flex flex-col gap-4'>
        <button
          className='icon-dark flex lg:hidden'
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          {openSidebar ? <MdMenuOpen /> : <MdMenu />}
        </button>
        <div className='flex items-center justify-center bg-gray-900'>
          <img src='' alt='PageLogo' className='h-12 w-12' />
        </div>
        <nav>
          <ul className='flex flex-col gap-3'>
            <li>Recogidas</li>
            <li>Despachos</li>
            <PrivateComponent role='Admin'>
              <li>Facturación</li>
            </PrivateComponent>
            <PrivateComponent role='Admin'>
              <li>
                <Link href='/indicadores'>Indicadores</Link>
              </li>
            </PrivateComponent>
          </ul>
        </nav>
      </div>
      <button type='button' onClick={() => signOut()}>
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
