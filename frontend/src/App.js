import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
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

function App() {
  const { token, setToken } = useToken();
  const [dash, setDash ] = useState(false);
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <div className="Top-Layer">
        <h1 className = "Name">Terra Terra</h1>
        <img src={smallLogo} className="Small-Logo" alt="smallLogo" />
      </div>
      <BrowserRouter>
      <div className="Temp">
        <Sidebar className="Sidebar" />
        {dash ? <Dashboard/> : <img src={logo} className="App-logo" alt="logo" />}    
      </div>
        <Routes>
          <Route path="/Preferences" element={<Preferences />} />
        </Routes>
        {!dash ? <button className="Terra-link" onClick={() => { HandleClick(); setDash(!dash) } }>
          Connect to Terra Terra
        </button> : null}   
      </BrowserRouter>
    </div>
  ) 
};

export default App;
