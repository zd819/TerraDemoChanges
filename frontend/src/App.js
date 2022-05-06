import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import Iframe from './components/Widget/IFrame.js'
import useToken from './useToken';
import logo from './misc/T_only.svg';
import Popup from './components/Widget/Popup.js'

//Either in the Widget.js or before we set shown to true, we must request
//SessionID from the backend and append to terraURL

async function getURL() {
  return fetch('http://localhost:8080/newSession', {
    method: 'POST',
    headers: {userid: 'DunnoYet'}
  })
    .then(data => data.json())
 }

const handleClick = () => {
  getURL()
  .then((data) => {console.log(data); window.open(data.url)});
};

function App() {
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
      <button className="Terra-link" onClick={handleClick}>
          Connect to Terra Terra
      </button>
    </div>
  );
}

export default App;
