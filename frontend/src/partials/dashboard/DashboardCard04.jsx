import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function averageWeeks(data){

  for(var i = 1; i < 7; i++){

    data[0] += data[i]; 

  }

  data.splice(1,6);

  for(var i = 2; i < 8; i++){

    data[1] += data[i]; 

  }

  data.splice(2,6);

  for(var i = 3; i < 9; i++){

    data[2] += data[i]; 

  }

  data.splice(3,6);

  for(var i = 4; i < (data.length - 2); i++){

    data[3] += data[i]; 

  }

  data.splice(4,9);


  data[0] = data[0]/7;
  data[1] = data[1]/7;
  data[2] = data[2]/7;
  data[3] = data[3]/7;

  return data;
}

function weeklyDates(data){

    //console.log('before splice ', data)

  data[1] = data[7];
  data[2] = data[14];
  data[3] = data[21];

  data.splice(4,27);

    //console.log('after splice ', data)

  return data;
}


function DashboardCard04() {
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [REM, setREM] = useState();
  const [deepSleep, setdeepSleep] = useState();
  const [lightSleep, setlightSleep] = useState();
  const [totalSleep, settotalSleep] = useState();
  const [dates, setdates ] = useState();
  var REM_arr = [];
  var dS_arr = [];
  var lS_arr = [];
  var tS_arr = [];
  var times = [];

  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      "userId" : "user1", 
      "startDate" : "2022-05-10",
      "endDate": "2022-06-09", 
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
        //console.log('dates', times);
        tS_arr.push(user.data.sleep_durations_data.asleep.duration_asleep_state/3600); 
        REM_arr.push(user.data.sleep_durations_data.asleep.duration_REM_sleep_state/3600);
        dS_arr.push(user.data.sleep_durations_data.asleep.duration_deep_sleep_state/3600);
        lS_arr.push(user.data.sleep_durations_data.asleep.duration_light_sleep_state/3600);
      };          
    }

    setLoading(false);
     
    averageWeeks(tS_arr);
    averageWeeks(REM_arr);
    averageWeeks(lS_arr);
    averageWeeks(dS_arr);
    weeklyDates(times);

    setdates(times);
    setREM(REM_arr);
    setdeepSleep(dS_arr);
    setlightSleep(lS_arr);
    settotalSleep(tS_arr);
  }
  loadPost();
  }, []);


  const chartData = {
    labels: dates,
    datasets: [
      // Light blue bars
      {
        label: 'Total Sleep Weekly Average',
        data: totalSleep,
        backgroundColor: tailwindConfig().theme.colors.sky[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[400],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      // Blue bars
      {
        label: 'Light Sleep Weekly Average',
        data: lightSleep,
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: 'Deep Sleep Weekly Average',
        data: deepSleep,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: 'REM  Sleep Weekly Average',
        data: REM,
        backgroundColor: tailwindConfig().theme.colors.blue[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[700],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-100 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
        Please connect a wearable which tracks Sleep Data
        </div> :
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Sleep Analysis</h2>
      </header>}
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
        Please connect a wearable which tracks Sleep Data
        </div> :
        <BarChart data={chartData} width={595} height={248} />
      }
    </div>
  );
}

export default DashboardCard04;
