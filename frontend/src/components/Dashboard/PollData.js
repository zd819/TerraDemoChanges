import React, {useEffect, useState } from 'react';
import getData from './testData.js'

export default function PollData() {

    const MINUTE_MS = 1000;

    useEffect(() => {
    const interval = setInterval(() => {
//        console.log('Logs every second');
        return getData();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

}

