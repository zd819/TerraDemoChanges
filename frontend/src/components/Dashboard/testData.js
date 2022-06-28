import React, {useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

export default function getData() {

    return  trackPromise(fetch('https://0dac-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/autoData', {
    method: 'POST',
    headers: {'Content-Type':'application/json',
              'userid': 'user1'}
    }))
    .then(data => {console.log(data); data.json()})
 }

 