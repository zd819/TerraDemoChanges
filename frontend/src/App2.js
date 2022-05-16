import React, { useEffect, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';
import './tailwind-dashboard-template/src/css/style.scss';
import './tailwind-dashboard-template/src/charts/ChartjsConfig';
// Import pages
import DashboardMoz from './tailwind-dashboard-template/src/pages/DashboardMoz';



import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardOld from './components/Dashboard/DashboardPage';
import Preferences from './components/Preferences/Preferences';
import DashboardApp from './tailwind-dashboard-template/src/DashboardApp.jsx'
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar.js';
import useToken from './useToken';
import logo from './misc/T_only.svg';
import smallLogo from './misc/Terralogo.png';
import useInterval from './hooks/autoData.js'
import useData from './components/Dashboard/PollData.js';
import testData from './components/Dashboard/testData.js';


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
  if(!dash){
      return(
      <div className="wrapper">
        <div className="Top-Layer">
          <h1 className = "Name">Terra Terra</h1>
          <img src={smallLogo} className="Small-Logo" alt="smallLogo" />
        </div>
        <div className="Temp">
          <Sidebar className="Sidebar" />
          {dash ? <DashboardOld/> : <img src={logo} className="App-logo" alt="logo" />}    
        </div>
          {!dash ? <button className="Terra-link" onClick={() => { HandleClick(); setDash(!dash) } }>
            Connect to Terra Terra
          </button> : null}   
      </div>
    )
  }
  else{ 
    return(
      <div>
          <Routes>
            <Route exact path="/" element={<DashboardApp />} />
          </Routes>
      </div>
    )
  } 
};

export default App2;
