import React, {useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

export default function getData() {

    return  trackPromise(fetch('https://7a34-2a02-6b6a-8c49-0-45a2-f907-3fe0-4be7.eu.ngrok.io/autoData', {
    method: 'POST',
    headers: {'Content-Type':'application/json',
              'userid': 'user1'}
    }))
    .then(data => {console.log(data); data.json()})
 }

 