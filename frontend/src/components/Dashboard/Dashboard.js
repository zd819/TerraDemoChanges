import React, { useState } from 'react';

async function getData() {
  return fetch('http://localhost:8080/getData', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({'datatype': 'athlete'})
  })
    .then()
 }

 const healthData = () => {
  getData()
  .then((data) => {console.log(data); return data});
};


export default function Dashboard() {
  const [data, viewData ] = useState(false);

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
