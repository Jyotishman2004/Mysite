import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useSwipeNavigation from '../hooks/useSwipeNavigation';

const Layout = () => {
  useSwipeNavigation();

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
