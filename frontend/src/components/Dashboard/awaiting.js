import React, { useEffect, useState } from 'react';



const url = "https://752b-80-3-12-252.eu.ngrok.io/";

async function sendWait(id) {
    return await fetch(url+'user/getProviders', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "userID" : id,
    }
    })
    .then(data => data.json())
   }



export default async function Awaiting(id, setConnected){
    // const [setConn, setSetter] = useState();
    
    // console.log('CRAZY : ', id, '<><> ', setConnected);
    try {
        const data = await sendWait(id);
        // console.log('Providers : ', data);
        setConnected(data);
    } catch (error) {
        return console.log(error);
    }
}