import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart04';

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

  data[1] = data[7];
  data[2] = data[14];
  data[3] = data[21];

  data.splice(4,27);

  return data;
}



function ActivityMinutes() {

  const url = "http://localhost:8080/data";
  const [isLoading, setLoading] = useState(true);
  const [week1, setweek1] = useState();
  const [week2, setweek2] = useState();
  const [week3, setweek3] = useState();
  const [week4, setweek4] = useState();
  const [dates_1, setdates_1] = useState();
  const [dates_2, setdates_2] = useState();
  const [dates_3, setdates_3] = useState();
  const [dates_4, setdates_4] = useState();
  var times = [];
  var act_arr = [];



  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      "userID" : "user1", 
      "startDate" : "2022-05-10",
      "endDate": "2022-06-09", 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "daily", 
      "provider" : "OURA", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });

    for (let user of response.result) {
      const day = user.date.substring(0,10).split('-').reverse().join('/');
      
      act_arr.push(user.data.active_durations_data.vigorous_intensity_seconds/60)      
      times.push(day); 
      

      
    };

    setLoading(false);

    averageWeeks(act_arr);
    weeklyDates(times);


    setdates_1(times[0]);
    setdates_2(times[1]);
    setdates_3(times[2]);
    setdates_4(times[3]);
    setweek1(act_arr[0]);
    setweek2(act_arr[1]);
    setweek3(act_arr[2]);
    setweek4(act_arr[3]);
    
   
    }
    loadPost(); 
    }, []);

  const chartData = {
    labels: 'Weeks',
    datasets: [
      {
        label: dates_1,
        data: [week1],
        backgroundColor: tailwindConfig().theme.colors.sky[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[400],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: dates_2,
        data: [week2],
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: dates_3,
        data: [week3],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: dates_4,
        data: [week4],
        backgroundColor: tailwindConfig().theme.colors.blue[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[700],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
        Please connect a wearable which tracks Activity Data
        </div> :
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800"> Intense Activity Minutes</h2>
        <h6 className="font-semibold text-slate-800">You Hitting Gym?</h6>
      </header>}
      <div className="px-5 py-3">
        <div className="flex items-start">
          {/* <div className="text-3xl font-bold text-slate-800 mr-2">449</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
        </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={48} />
      </div>}
    </div>
  );
}

export default ActivityMinutes;