import React, { useState, useEffect } from 'react';
import { decode } from 'he';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from './misc/T_only.svg';
import './App.css';

const App = () => {
  const [joke, setJoke] = useState('');

  const fetchJoke = async signal => {
    const url = new URL('https://api.icndb.com/jokes/random');
    const response = await fetch(url, { signal });
    const { value } = await response.json();

    setJoke(decode(value.joke));
  };

  useEffect(() => {
    if (!joke) {
      const controller = new AbortController();
      fetchJoke(controller.signal);

      return () => controller.abort();
    }
  }, [joke]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{joke || '...'}</p>
        <button className="App-link" onClick={() => setJoke('')}>
          Get a new joke
        </button>
      </header>
    </div>
  );
}

export default App;
