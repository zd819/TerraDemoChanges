import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11() {

  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading] = useState(true);
  const [asleep, setasleep] = useState();
  const [awake, setawake] = useState();
  const [dates, setdates] = useState();
  var asleep_arr = [];
  var awake_arr = [];
  var times = [];

  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      "userId" : "user1", 
      "startDate" : "2022-06-03",
      "endDate": "2022-06-11", 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "sleep", 
      "provider": "OURA",
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
    });
    //pushing data from mongo into arrays
    for (let user of response.result) {
      const temp_day = new Date(user.date); 
      if(temp_day.getHours() < 6 && 0 < temp_day.getHours()){
        temp_day.setDate(temp_day.getDate() - 1);
      };
      
      const day = temp_day.toISOString().substring(0,10).split('-').reverse().join('-'); 
      times.push(day);
      //console.log('day', times);
      asleep_arr.push(user.data.sleep_durations_data.asleep.duration_asleep_state/3600);
      awake_arr.push(user.data.sleep_durations_data.awake.duration_before_sleeping/3600);
      //console.log('awake data is', awake_arr);
      //console.log('asleep data is', asleep_arr);
      
    };

    setLoading(false);

    awake_arr.splice(7,7);
    asleep_arr.splice(7,7);
    times.splice(7,7);
    

    setdates(times);
    setawake(awake_arr);
    setasleep(asleep_arr);

  }
  loadPost();
  }, []);

  //console.log('before plot', awake);
  //console.log('before plot', asleep);
  //console.log('before plot', dates);


  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Asleep',
        data: asleep,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: 'Awake',
        data: awake,
        backgroundColor: tailwindConfig().theme.colors.indigo[800],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[900],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Sleep Times</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        { isLoading ? <div>
        Please connect a wearable which tracks Sleep Data
        </div> :
        <BarChart data={chartData} width={595} height={300} />}
      </div>
    </div>
  );
}

export default DashboardCard11;
