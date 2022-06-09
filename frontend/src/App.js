import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Routes,
  Route,
  useLocation 
} from 'react-router-dom';

import generateID from './components/User/UserID.js';

// Import pages
import App2 from './App2.js';
import DashboardMoz from './pages/DashboardMoz';
import AnalyticsMain from './AnalyticMain';

function DashboardApp() {

  // const location = useLocation();
  
  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change

  var newID = generateID();
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<App2 />} />
        <Route exact path="/Analytics" element={<AnalyticsMain />}/>
        <Route exact path="/Dashboard" element={<DashboardMoz id={newID } />} />
      </Routes>
    </BrowserRouter>
  );
}

export default DashboardApp;
