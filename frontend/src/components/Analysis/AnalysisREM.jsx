import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import EditMenu from '../../partials/EditMenu.jsx';
// import getData from '../../components/Dashboard/testData.js'
import axios from "axios";
import qs from 'qs';

import { ConvertTime } from '../DataHandling/ConvertTime.js'
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

  
  

function Analysis1() {
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [startDate, setstartDate ] = useState(getDiffTime('-', 25));
  const [endDate, setendDate ] = useState(localTime());
  const [Data, setData ] = useState([]);
  const [Date, setDate ] = useState([]);
  var times = [];
  var remdata = [];
  
  useEffect(() => { // useEffect hook
      const loadPost = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        "userID" : "user1", 
        "startDate" : startDate,
        "endDate": endDate, 
        "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
        "type": "sleep",
        "provider" : "OURA",  
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
        });
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
      
      for (let user of response.result) {
        const day = (user.date.split('-'));
        const newDate = day[1] + '-' + day[0] + '-' + day[2]; 
        if(times.indexOf(newDate) == -1){
          times.push(newDate); 
          remdata.push(user.data.duration_REM_sleep_state/3600);
        }
      };
      // times = sortedDescending;
      setData(remdata);
      setDate(times);
      setLoading(false);
      
      
    }
    loadPost(); 
    }, []);
    
    // console.log('DATA  : ', Data);
    // console.log('DATE: ', Date);
  //console.log('Logged DATES', Date);
  const chartData = {
    labels: Date,
    datasets: [
      // Indigo line
      {
        data: Data,
        label: 'Total REM Sleep',
        fill: true,
        ticks: {
          callback: function(value, index, ticks) {
            return value + ' Kcal'  ;
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
      // Gray line
      // {
      //   data: DATA.map(val => val + (Math.random()-0.5)*0.2),
      //   label: 'Goal',
      //   borderColor: tailwindConfig().theme.colors.slate[300],
      //   borderWidth: 2,
      //   tension: 0,
      //   pointRadius: 0,
      //   pointHoverRadius: 3,
      //   pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
      //   clip: 20,
      // },
    ],
  };

  return (
 <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
  { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
    Please connect a wearable which tracks Activity Data
    </div> :
    <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="50" height="50" alt="Icon 01" /> */}
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
            </li>
          </EditMenu>
        </header>
        
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Rem Sleep</h2>
        {/* <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Your Nutrition Data Analysis</div> */}
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">3 Months Ago</div>
          {/* <div className={'text-sm font-semibold text-white px-1.5 rounded-full ' + (calorieOver ? 'bg-yellow-500' : 'bg-green-500')}>
            {calorieOver ? Over : Under};
          </div> */}
        </div>
  </div>}
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

export default Analysis1;
