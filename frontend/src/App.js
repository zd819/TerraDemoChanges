import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import Iframe from './components/Widget/Widget.js'
import PostTerra from './components/Widget/PostTerra.js'
import useToken from './useToken';
import logo from './misc/T_only.svg';

//Either in the Widget.js or before we set shown to true, we must request
//SessionID from the backend and append to terraURL



function App() {

  const [shown, setShown] = React.useState(false)
  const [showID, setID] = React.useState(false)
  const verURL = 'https://api.tryterra.co/v2/auth/generateWidgetSession'
  const authURL = "https://api.tryterra.co/v2/auth/authenticateUser"
  const terraURL = "https://widget.tryterra.co/v2/"

  const { token, setToken } = useToken();

  const { iD, setiD } = PostTerra();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Terra Terra</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <BrowserRouter>
        <Routes>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Preferences' element={<Preferences />} />
        </Routes>
      </BrowserRouter>
      <button className="Terra-link" onClick={() => setShown(!shown)}>
          Connect to Terra Terra
      </button>
      {shown ?  <Iframe className='Widget' source= {terraURL+iD} /> : null}
      
      <button className="Session-iD" onClick={() => setID(!showID)}>
          Get Session ID
      </button>
      {showID ?  <h2> {iD}</h2> : null}
    </div>
  );
}

export default App;
