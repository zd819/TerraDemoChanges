import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import './Login.css';


async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
  })
  .then(data => data.json())  
};

export default function Login({ setToken , id, HandleClick}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    // HandleClick(id);
    this.props.history.push('/Dashboard')
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form >
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <div>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>




          </h1>
          <button type="submit">LOGIN AS GUEST</button>
        </div>
      </form>

    </div>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
