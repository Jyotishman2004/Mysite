import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useSwipeNavigation from '../hooks/useSwipeNavigation';

const Layout = () => {
  useSwipeNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
