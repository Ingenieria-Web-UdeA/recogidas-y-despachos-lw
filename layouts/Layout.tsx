import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import { NavigationContextProvider } from '@context/navigationContext';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <NavigationContextProvider>
    <main className='flex h-screen w-full flex-col lg:flex-row'>
      <Navbar />
      <Sidebar />
      <section className='debug h-full w-full'>{children}</section>
    </main>
  </NavigationContextProvider>
);

export default Layout;
