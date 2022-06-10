import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Routes,
  Route,
  useLocation 
} from 'react-router-dom';

import {sha1,sha256,sha384,sha512} from 'crypto-hash';

import GenerateID from './components/User/UserID.js';

// Import pages
import App2 from './App2.js';
import DashboardMoz from './pages/DashboardMoz';
import AnalyticsMain from './AnalyticMain';
var shajs = require('sha.js');

function DashboardApp() {
  const [userID, setUserID] = useState('');
  const current = new Date().toLocaleString();

  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change

  async function GenerateID(){
    let ID = await sha256(current).then((result) => {
        console.log('2222222222222 : ', result);
        setUserID(result);
        return result;
      });
    console.log("33333333333333 : ", ID);
    console.log("4444444444444: ", userID);
    return userID;
};

  var newID = GenerateID();
  console.log("99999 : ", userID);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<App2 id={userID} />} />
        <Route exact path="/Analytics" element={<AnalyticsMain />}/>
        <Route exact path="/Dashboard" element={<DashboardMoz id={userID} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default DashboardApp;
