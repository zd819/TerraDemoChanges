import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart03';
import EditMenu from '../../partials/EditMenu.jsx';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

  
  

function DashboardCard05() {
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [sleepEff, setsleepEff] = useState([]);
  const [dates, setdates] = useState([]);
  var times = [];
  var sleepEff_arr = [];
  
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
        "type": "sleep",
        "provider" : "OURA",  
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
        });
      
      for (let user of response.result) {
          const temp_day = new Date(user.date); 
          if(temp_day.getHours() < 6 && 0 < temp_day.getHours()){
            temp_day.setDate(temp_day.getDate() - 1);
          };
          const day = temp_day.toISOString().substring(0,10).split('-').reverse().join('-');
          if(times.indexOf(day) == -1){
            const day = temp_day.toISOString().substring(0,10).split('-').reverse().join('-');
            times.push(day);
            sleepEff_arr.push(user.data.metadata.sleep_efficiency);         
            }
      };

      setLoading(false);
      setsleepEff(sleepEff_arr);
      setdates(times);
      
    }
    loadPost(); 
    }, []);


    
  const chartData = {
    labels: dates,
    datasets: [
      // Indigo line
      {
        data: sleepEff,
        label: 'Sleep Efficiency',
        fill: true,
        ticks: {
          callback: function(value, index, ticks) {
            return value + '%';
          },
        },
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };

  return (
 <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
  { isLoading ? <div>
    Please connect a wearable which tracks Sleep Data
    </div> :
    <header className="px-5 py-4 border-b border-slate-100">
    <h2 className="font-semibold text-slate-800">Sleep Efficiency</h2>
    </header>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div>
    </div> :
       <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {/* {Here can use hooks to not render LineChart, but render loading icon} */}
        {/* link : https://programmingwithmosh.com/react/create-react-loading-spinner/ */}
        {/* Understanding code layout : freecodecamp.org/news/quick-guide-to-understanding-and-creating-reactjs-apps-8457ee8f7123/ */}
        <LineChart data={chartData} width={389} height={128} tick = {"sleep"}/>
      </div>}
    </div>
   );
}

export default DashboardCard05;
