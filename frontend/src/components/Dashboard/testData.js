import React, {useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

export default function getData() {

    return  trackPromise(fetch('http://localhost:8080/autoData', {
    method: 'POST',
    headers: {'Content-Type':'application/json',
              'userid': 'user1'}
    }))
    .then(data => {console.log(data); data.json()})
 }

 