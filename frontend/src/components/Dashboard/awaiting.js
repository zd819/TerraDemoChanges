import React, { useEffect, useState } from 'react';



const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/";

async function sendWait(id) {
    return await fetch(url+'userProviders', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "userID" : id,
    }
    })
    .then(data => data.json())
   }



export default function Awaiting(id, setConnected){
    // const [setConn, setSetter] = useState();
    
    console.log('CRAZY : ', id, '<><> ', setConnected);
    return sendWait(id)
    .then((data) => {
        console.log('Providers : ' ,data);
        setConnected(data);
    })
    .catch((error) => console.log(error));
}