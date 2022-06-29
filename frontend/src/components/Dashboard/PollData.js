import React, {useEffect, useState } from 'react';
import getData from './testData.js'
import awaiting from './awaiting.js';

const url = "http://localhost:8080/";


const sendWait = async (data) => {
    const data_1 = await fetch(url + 'user/getProviders', {
        method: 'GET',
        headers: { userId: data }
    });
    return await data_1.json();
   }

const PollData = (data) => { 
    const MINUTE_MS = 100000;
    useEffect(() => {
    const interval = setInterval(() => {
        //console.log('Logs every second');
        return sendWait(data);
    }, MINUTE_MS);

    return (data) => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
}

export default PollData;



