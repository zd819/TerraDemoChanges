import React, { useState } from 'react';
import PollData from './PollData.js'
import getData from './testData.js'

// async function getData() {
//   return fetch('https://7a34-2a02-6b6a-8c49-0-45a2-f907-3fe0-4be7.eu.ngrok.io/getData', {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({'datatype': 'athlete'})
//   })
//     .then()
// }

 const healthData = () => {
  getData()
  .then((data) => {console.log(data); return data});
};

const ShowData = () => {
  PollData()
  .then((data) => {console.log(data)});
};

export default function DashboardOld() {
  const [data, viewData ] = useState(false);
  //getData();
  return(
    <div className="Dashboard">
      <h1 className="Title">Dashboard </h1>
      <button className="Display-Data" onClick={() => { getData() } }>
          Display Health Data
      </button>
      {data ?<h1 className="Health-Data" onClick={() => { healthData(); viewData(!data) } }>
                User Data : 
              </h1> : null} 
    </div>
  );
}
