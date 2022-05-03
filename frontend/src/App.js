import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import useToken from './useToken';
import logo from './misc/T_only.svg';

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
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Preferences' element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
