import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Routes,
  Route,
  useLocation 
} from 'react-router-dom';

import {sha1,sha256,sha384,sha512} from 'crypto-hash';

import GenerateID from './components/User/UserID.js';
import useToken from './useToken';


// Import pages
import App2 from './App2.js';
import DashboardMoz from './pages/DashboardMoz';
import AnalyticsMain from './AnalyticMain';
var shajs = require('sha.js');

function DashboardApp() {
  const [userID, setUserID] = useState(''); //Use State for Session ID
  const [reload, setReload ] = useState(true); // Use state for reloading Dates
  const { token, setToken } = useToken(); // Use State for login token
  
  const current = new Date().toLocaleString(); //Get Current Full time and convert to string
  async function GenerateID(){ //Uses the current time and a random pertubated string as keys to a SHA256 hash  
    let ID = await sha256(current+(Math.random()*1000*Math.random()).toLocaleString).then((result) => {
        setUserID(result); // Use setter to set generated Session ID
        return result;
      });
    return userID;
  };

  var newID = GenerateID(); // Run Generate function
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<App2 id={userID} token={token} setToken={setToken} />} />
        <Route exact path="/Analytics" element={<AnalyticsMain />}/>
        <Route exact path="/Dashboard" element={<DashboardMoz id={userID} setReload = {setReload} setToken={setToken} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default DashboardApp;
