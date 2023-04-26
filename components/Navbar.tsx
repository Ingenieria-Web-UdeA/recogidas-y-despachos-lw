import { useNavigationContext } from '@context/navigationContext';
import { MdMenu, MdMenuOpen } from 'react-icons/md';

const Navbar = () => {
  const { openSidebar, setOpenSidebar } = useNavigationContext();
  return (
    <nav className='flex items-center justify-between px-2 lg:hidden'>
      <div className='text-xl'>
        <button
          className='icon'
          type='button'
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          {openSidebar ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </div>
      <div>nombre</div>
      <div>logo</div>
    </nav>
  );
};

export default Navbar;
