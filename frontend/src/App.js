import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Routes,
  Route,
  useLocation 
} from 'react-router-dom';

import {sha1,sha256,sha384,sha512} from 'crypto-hash';

// import GenerateID from './components/User/UserID.js';

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
  const GenerateID = async () => {
    const [userID, setUserID] = useState('');
    const current = new Date().toLocaleString();
    const result = JSON.stringify(await sha256(current));
    console.log("User ID Unique Result is : ", result);
    // console.log("useState ID : ", userID);
    return result;
  };
  var newID = GenerateID();
  console.log("1111111 : ", newID);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<App2 />} />
        <Route exact path="/Analytics" element={<AnalyticsMain />}/>
        <Route exact path="/Dashboard" element={<DashboardMoz id={newID} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default DashboardApp;
