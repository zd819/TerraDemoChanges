import React, {useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

export default function getData() {

    return  trackPromise(fetch('https://752b-80-3-12-252.eu.ngrok.io/autoData', {
    method: 'POST',
    headers: {'Content-Type':'application/json',
              'userid': 'user1'}
    }))
    .then(data => {console.log(data); data.json()})
 }

 