import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart02';
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function StepCounter() {
  

  const url = "http://localhost:8080/data";
  const [isLoading, setLoading] = useState(true);
  const [steps, setsteps] = useState();
  const [dist, setdist] = useState();
  const [dates, setdates] = useState();
  var times = [];
  var step_arr = [];
  var dist_arr = [];

  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    // axios(options)
    console.log("Getting Activity Data");
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      "userID" : "user1", 
      "startDate" : "2022-06-13",
      "endDate": "2022-06-20", 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "daily", 
      "provider" : "OURA", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });

    for (let user of response.result) {
      const day = user.date.substring(0,10).split('-').reverse().join('-');
      if(times.indexOf(day) == -1){      
        dist_arr.push(user.data.distance_data.distance_metres);
        step_arr.push(user.data.distance_data.steps);
        times.push(day); 
      }
        
    };


    setLoading(false);
    setsteps(step_arr); //set Time state
    setdist(dist_arr);
    setdates(times); //set Data state

    }
    loadPost(); 
    }, []);

    

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Steps',
        data: steps,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: 'Distance (m)',
        data: dist,
        backgroundColor: tailwindConfig().theme.colors.indigo[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[300],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
        Please connect a wearable which tracks Activity Data
        </div> :
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">General Activity</h2>
      </header>}
      <header className="px-5 py-0.0001 border-b border-slate-100 flex items-center"> 
      <h6 className="font-semibold text-slate-800">Make Sure You Stay Active!</h6>
       </header> 
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
        </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={200} />
      </div>}
    </div>
  );
}

export default StepCounter;
