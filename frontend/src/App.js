import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import Iframe from './components/Widget/IFrame.js'
import useToken from './useToken';
import logo from './misc/T_only.svg';

//Either in the Widget.js or before we set shown to true, we must request
//SessionID from the backend and append to terraURL

async function getURL() {
  return fetch('http://localhost:8080/newSession', {
    method: 'POST',
    headers: {userid: 'DunnoYet'}
  })
    .then(data => data.json())
 }

async function checkURL(){
  const response = getURL();
  console.log(response);
  return 'http://www.google.com';
}

function App() {

  const [shown, setShown] = React.useState(false)
  const verURL = 'https://api.tryterra.co/v2/auth/generateWidgetSession'
  const authURL = "https://api.tryterra.co/v2/auth/authenticateUser"
  const terraURL = "https://widget.tryterra.co/v2/"

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Terra Terra</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
      <button className="Terra-link" onClick={() => setShown(!shown)}>
          Connect to Terra
      </button>
      {shown ? <Iframe className='Widget' source ={checkURL()} /> : null}
    </div>
  );
}

export default App;
