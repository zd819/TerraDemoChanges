import React, { useEffect, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';
import { Link } from 'react-router-dom';

import './css/style.scss';
import './charts/ChartjsConfig';
// Import pages
import DashboardMoz from './pages/DashboardMoz';



import './App.css';
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


//Either in the Widget.js or before we set shown to true, we must request
//SessionID from the backend and append to terraURL

async function getURL() {
  return fetch('http://localhost:8080/newSession', {
    method: 'POST',
    headers: {userid: 'DunnoYet'}
  })
    .then(data => data.json())
 }

const HandleClick = () => {
  getURL()
  .then((data) => {console.log(data); window.open(data.url)});
};

const Mozaic = () =>{
  window.open('http://localhost:3000/Dashboard')
};

const ShowData = () => {
  PollData()
  .then((data) => {console.log(data)});
};

function App2() {

  // const location = useLocation();
  
  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change
  
  const { token, setToken } = useToken();
  const [dash, setDash ] = useState(false);

  if(!token) {
    return <Login setToken={setToken} />
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
          <Link to="/Dashboard" className="btn btn-primary" onClick={() => { HandleClick(); setDash(!dash); } } >
          Connect to Terra Terra
          </Link>
      </div>
    )
  // }
  // else{ 
  //   return(
  //     <div>
  //         <Routes>
  //           <Route exact path="/Dashboard" element={<DashboardMoz />} />
  //         </Routes>
  //     </div>
  //   )
  // } 
};

export default App2;
