import React, {useEffect, useState } from 'react';
import getData from './testData.js'

export default async function PollData() {

    const MINUTE_MS = 1000;

    useEffect(() => {
    const interval = setInterval(() => {
        //console.log('Logs every second');
        return [getData(),"true"];
    }, MINUTE_MS);

    return (data) => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

}

