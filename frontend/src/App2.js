import React, { useEffect, useState } from 'react';
import {sha1,sha256,sha384,sha512} from 'crypto-hash';
import {
  useLocation
} from 'react-router-dom';
import { Link } from 'react-router-dom';

import './css/style.scss';
import './charts/ChartjsConfig';
// Import pages
import DashboardMoz from './pages/DashboardMoz';



import './App.css';
import HandleClick from './components/Login/newSession';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardOld from './components/Dashboard/DashboardPage';
import Preferences from './components/Preferences/Preferences';
import DashboardApp from './DashboardApp.jsx'
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar.js';
import useToken from './useToken';
import logo from './misc/T_only.svg';
import smallLogo from './misc/Terralogo.png';
import useInterval from './hooks/autoData.js'
import useData from './components/Dashboard/PollData.js';
import testData from './components/Dashboard/testData.js';
import PollData from './components/Dashboard/PollData.js'
import generateID from './components/User/UserID';


//Either in the Widget.js or before we set shown to true, we must request
//SessionID from the backend and append to terraURL

const url = "https://2782-80-3-12-252.eu.ngrok.io"

async function generateIDs() {
  const current = new Date().toLocaleString();
  const result = JSON.stringify(await sha256(current));
  console.log("User ID Unique Result is : ", result);
  return result;
}

async function getURL() {
  return await fetch(url+'/newSession', {
    method: 'GET',
    headers: {userId: JSON.stringify(generateID())}
  })
  .then(data => data.json())
 }

const HandleClick1 = () => {
  // var ID = generateID();
  getURL()
  .then((data) => {console.log(data); window.open(data.url)})
  .catch((error) => console.log(error));
};

const ShowData = () => {
  PollData()
  .then((data) => {console.log(data)});
};

function App2(props) {
  // const location = useLocation();
  
  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change
  
  // const { token, setToken } = useToken();
  const [dash, setDash ] = useState(false);
  if(!props.token) {
    generateID();
    return (
    <div className = " wrapper bg-slate-50 h-screen">
      <Login setToken={props.setToken} id = {props.id} HandleClick={HandleClick} />
    </div>
    )
  }
  // if(!dash){
      return(
        
      <div className="wrapper">
        <div className="Top-Layer">
          <h1 className = "text-blue-400 font-extrabold">Terra Terra</h1>
          {/* Adding the tailwind css: "text-blue-400 font-extrabold", doesnt work indicating tailwind 
          isnt working as inteded, or installed correctly*/}
          <img src={smallLogo} className="Small-Logo" alt="smallLogo" />
        </div>
        <div className="Temp">
          <Sidebar className="Sidebar" />
          { <img src={logo} className="App-logo" alt="logo" />}    
        </div>
          {/* {!dash ? <button className="Terra-link" onClick={() => { HandleClick(); setDash(!dash); } }>
            Connect to Terra Terra
          </button> : null}    */}
          <Link to="/Dashboard" className="btn btn-primary" onClick={() => { HandleClick(props.id);} } >
          Connect to Terra Terra
          </Link>
      </div>
    )
};

export default App2;
