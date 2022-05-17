import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';


// Import pages
import DashboardMoz from './pages/DashboardMoz';

function DashboardApp() {

  const location = useLocation();
  
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashboardMoz />} />
      </Routes>
    </>
  );
}

export default DashboardApp;
