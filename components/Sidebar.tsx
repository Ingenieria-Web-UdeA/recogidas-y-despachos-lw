import { useNavigationContext } from '@context/navigationContext';
import { signOut } from 'next-auth/react';
import React from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import PrivateComponent from './PrivateComponent';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
            <SidebarLink href='/recogidas' text='Recogidas' />
            <SidebarLink href='/despachos' text='Despachos' />
            <PrivateComponent role='Admin'>
              <SidebarLink href='/facturacion' text='Facturación' />
            </PrivateComponent>
            <PrivateComponent role='Admin'>
              <SidebarLink href='/indicadores' text='Indicadores' />
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

interface SidebarLinkProps {
  href: string;
  text: string;
}

const SidebarLink = ({ href, text }: SidebarLinkProps) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <li className={isActive ? 'active' : ''}>{text}</li>
    </Link>
  );
};

export default Sidebar;
