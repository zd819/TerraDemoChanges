import React, {useEffect, useState } from 'react';
import getData from './testData.js'
import awaiting from './awaiting.js';

const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/";


const sendWait = async (data) => {
    const data_1 = await fetch(url + 'getUserProviders', {
        method: 'GET',
        headers: { userId: data }
    });
    return await data_1.json();
   }

const PollData = (data) => { 
    const MINUTE_MS = 10000;
    useEffect(() => {
    const interval = setInterval(() => {
        //console.log('Logs every second');
        return sendWait(data);
    }, MINUTE_MS);

    return (data) => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
}

export default PollData;



