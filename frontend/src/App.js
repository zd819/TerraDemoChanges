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
  

  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change

  const current = new Date().toLocaleString();
  async function GenerateID(){
    let ID = await sha256(current).then((result) => {
        setUserID(result);
        return result;
      });
    return userID;
};

  var newID = GenerateID();
  console.log('891- : ', userID);
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
