import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11() {

  const url = "https://0dac-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [asleep, setasleep] = useState();
  const [awake, setawake] = useState();
  const [Date, setDate ] = useState();
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
      "endDate": "2022-06-10", 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "sleep", 
      "provider": "OURA",
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
    });
    //pushing data from mongo into arrays
    for (let user of response.result) {
      if((times.indexOf(user.date) == -1)){
        const day = (user.date.split('-'));
        const newDate = day[1] + '-' + day[0] + '-' + day[2]; 
        times.push(newDate);
        asleep_arr.push(user.data.asleep.duration_asleep_state/3600);
        awake_arr.push(user.data.awake.duration_before_sleeping/3600);
        console.log('awake data is', awake_arr);
        console.log('asleep data is', asleep_arr);
      }
    };

    setLoading(false);

    setDate(times);
    setawake(awake_arr);
    setasleep(asleep_arr);
  }
  loadPost();
  }, []);


  const chartData = {
    labels: Date,
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
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Sleep Times</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;
