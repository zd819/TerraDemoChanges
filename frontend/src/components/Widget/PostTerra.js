import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function PostTerra() {
 return fetch('https://api.tryterra.co/v2/auth/generateWidgetSession', {
   method: 'POST',
   headers: {
     'dev-id': 'imperial-dev-h50AyvQelJ',
     'x-api-key': 'b8b806fa7c6ca5fb0ee1116af19ddde9626e370e9c43731525bf3584281bcd79'
   },
   body: JSON.stringify({language: 'EN'})
 })
   .then(data => data.json())
}


export default PostTerra;
