import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import EditMenu from '../../partials/EditMenu.jsx';
// import getData from '../../components/Dashboard/testData.js'
import axios from "axios";
import qs from 'qs';

import { ConvertTime } from '../DataHandling/ConvertTime.js'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

  
  

function Analysis1() {
  const url = "https://6777-82-69-42-98.eu.ngrok.io/testing";
  const [isLoading, setLoading ] = useState(true);
  const [Data, setData ] = useState([]);
  const [Date, setDate ] = useState([]);
  var times = [];
  var remdata = [];
  const green = "bg-green-500";
  const yellow = "bg-yellow-500";
  
  useEffect(() => { // useEffect hook
      const loadPost = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        // "Content-Type": "application/json",
        "userID" : "user1", 
        "startDate" : "2022-04-29",
        "endDate": "2022-05-24", 
        "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
        "type": "sleep", 
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
        });
      console.log('Resposne is : ', response);
      for (let  user of response) {
        times.push(user.date); 
        remdata.push(user.data);
      };
      console.log('TIMES :', typeof(times));
      console.log('DATA : ', typeof(remdata));
      console.log('Retreived Data');
      setData(remdata);
      setDate(times);
      setLoading(false);
      console.log('123 : ', Data);
      console.log('456 : ', Date);
    }
    loadPost(); 
    }, []);

  
  //console.log('Logged DATES', Date);
  const chartData = {
    labels: Date,
    datasets: [
      // Indigo line
      {
        data: Data,
        label: 'Calories Consumed',
        fill: true,
        ticks: {
          callback: function(value, index, ticks) {
            return value + ' Kcal'  ;
          }},
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
        <LineChart data={chartData} width={389} height={128} />
      </div>    }
    </div>
   );
}

export default Analysis1;
