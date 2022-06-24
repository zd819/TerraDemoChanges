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

  for(var i = 4; i < (data.length - 3); i++){

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

  data[1] = data[7];
  data[2] = data[14];
  data[3] = data[21];

  data.splice(4,27);

  return data;
}


function DashboardCard04() {
  const url = "https://2782-80-3-12-252.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [REM, setREM] = useState();
  const [deepSleep, setdeepSleep] = useState();
  const [lightSleep, setlightSleep] = useState();
  const [totalSleep, settotalSleep] = useState();
  const [Date, setDate ] = useState();
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
      "startDate" : "2022-05-11",
      "endDate": "2022-06-10", 
      "terraId": "54903686-1da1-4c82-b58d-3c3fdbb8061b",
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
        tS_arr.push(user.data.duration_asleep_state/3600); 
        REM_arr.push(user.data.duration_REM_sleep_state/3600);
      //dS_arr.push(user.data.duration_deep_sleep_state);
      //lS_arr.push(user.data.duration_light_sleep_state);
      }
    };
    // let sortedDescending = response.sort((a, b) => {
    //   const aDate = a.date.split('-');
    //   const bDate = b.date.split('-');
    //   if(aDate[2]!=bDate[2]){
    //     return aDate[2]-bDate[2];
    //   }
    //   else if(aDate[1]!=bDate[1]){
    //     return aDate[1]-bDate[1];
    //   }
    //   else return aDate[0]-bDate[0];
    // });
    setLoading(false);
    averageWeeks(tS_arr);
    averageWeeks(REM_arr);
    weeklyDates(times);
    

    setDate(times);
    console.log('weeks data', tS_arr);
    setREM(REM_arr);
    //setdeepSleep(dS_arr);
    //setlightSleep(lS_arr);
    settotalSleep(tS_arr);
  }
  loadPost();
  }, []);


  const chartData = {
    labels: Date,
    datasets: [
      // Light blue bars
      {
        label: 'Total Sleep',
        data: totalSleep,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      // Blue bars
      {
        label: 'REM Sleep',
        data: REM,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-100 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div>
        Please connect a wearable which tracks Activity Data
        </div> :
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Sleep Analysis</h2>
      </header>}
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      { isLoading ? <div>
        Please connect a wearable which tracks Activity Data
        </div> :
        <BarChart data={chartData} width={595} height={248} />
      }
    </div>
  );
}

export default DashboardCard04;
