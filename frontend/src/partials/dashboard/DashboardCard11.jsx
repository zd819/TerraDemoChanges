import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11() {

  const url = "http://localhost:8080/data";
  const [isLoading, setLoading] = useState(true);
  const [ave_hr, setave_hr] = useState();
  const [max_hr, setmax_hr] = useState();
  const [min_hr, setmin_hr] = useState();
  const [dates, setdates] = useState();

  var ave_arr = [];
  var max_arr = [];
  var min_arr = [];
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
      if(times.indexOf(day) == -1){
      times.push(day);
     
      ave_arr.push(user.data.heart_rate_data.avg_hr);
      max_arr.push(user.data.heart_rate_data.max_hr);
      min_arr.push(user.data.heart_rate_data.min_hr);

      //console.log('day', times);
      //console.log('awake data is', awake_arr);
      //console.log('asleep data is', asleep_arr);
    }
    };

    setLoading(false);

    setdates(times);
    setave_hr(ave_arr);
    setmax_hr(max_arr);
    setmin_hr(min_arr);

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
        label: 'Max Heart Rate',
        data: max_hr,
        backgroundColor: tailwindConfig().theme.colors.sky[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: 'Min Heart Rate',
        data: min_hr,
        backgroundColor: tailwindConfig().theme.colors.blue[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[900],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: 'Average Heart Rate',
        data: ave_hr,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[900],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      }, 
    ],
  };


  return (
    <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div>
        Please connect a wearable which tracks Sleep Data
        </div> :
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Sleep Heart Rate</h2>
        <h6 className="font-semibold text-slate-800">How's Your Heart Doing?</h6>
      </header>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div>
        </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={300} />
      </div>}
    </div>
  );
}

export default DashboardCard11;
