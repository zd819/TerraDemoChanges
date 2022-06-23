import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';
import TerraLogo from '../../images/terra_logo_dark copy.png';
import TerraAvatar from '../../images/user-avatar-32.png';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

async function loginUser(credentials) {
 return fetch('https://09b9-80-3-12-252.eu.ngrok.io/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
  })
  .then(data => data.json())  
};

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  
 

  return(
    
    
    <div className=" wrapper bg-blue-100 h-full">
      <img src={TerraAvatar} width="100" height="100" className="Terra-Avatar wrapper" alt="TerraAvatar" />
      
      <h1 className = "text-blue-250 font-extrabold h-120" >Please Log In</h1>
      <form onSubmit={handleSubmit} className= "h-120">
        <label>
          <p>Username</p>
          <input type="text " onChange={e => setUserName(e.target.value)}/>
        </label>
        <div>
          <label>
            <p>Password </p>
            <input type=" password" onChange={e => setPassword(e.target.value)}/>
          </label>
        </div>
        <div>
          <button type=" submit">Submit</button>
        </div>
        <div className="flex items-center truncate">
        <img src={TerraLogo}  width="300" height="300" className="Terra-Logo " alt="TerraLogo" />
        </div>
      </form>
    </div>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
