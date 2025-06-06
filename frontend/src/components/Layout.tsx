import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Header />} 
      <Outlet />
    </>
  );
};

export default Layout;
