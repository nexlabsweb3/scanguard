import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default Layout;
