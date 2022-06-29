import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-03.svg';
import EditMenu from '../EditMenu';
import PollData from '../../components/Dashboard/PollData';
// import getData from '../../components/Dashboard/testData.js'
import axios from "axios";
import qs from 'qs';


import { ConvertTime } from '../../components/DataHandling/ConvertTime.js'
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
  
function DashboardNutrition(props) {
  function date1W(){
    setendDate(getDiffTime('-', 7));
  }
  function date1M(){
    setendDate(getDiffTime('-', 30));
  }
  function date3M(){
    setendDate(getDiffTime('-', 90));
  }

  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [calorieOver, setCalories ] = useState(false);
  const [startDate, setstartDate ] = useState(getDiffTime('-', 25));
  const [endDate, setendDate ] = useState(localTime());
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
  if(props.overrideDate === true){
    console.log('BESERK : ', props.dates[0], ' <-> ', props.dates[1]);
    setstartDate(props.dates[0]);
    setendDate(props.dates[1]);
    // props.setOverrideDate(false);
  }
  // console.log(props.overrideDate, ' CARD 1 ', startDate, ' <-> ', endDate);

  useEffect(() => { // useEffect hook
      const loadPost = async () => {
        console.log('Getting Health Data');
        const response = await fetch(url, {
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          "userID" : "user1", 
          "startDate" : startDate,
          "endDate": endDate, 
          "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
          "type": "nutrition",
          "provider" : "MYFITNESSPAL", 
        }}).then((res => res.json()))
        .catch(function(error){
            console.log(error);
          });
        for (let user of response.result) {
            const day = (user.date.split('-'));
            const newDate = day[1] + '-' + day[0] + '-' + day[2]; 
            if(times.indexOf(newDate) == -1){
              times.push(newDate); 
              points.push(user.data.calories);            
          }
        };
        console.log('NUTRITION is ', points); 
        setData(points); //set Time state
        setDate(times); //set Data state
        setLoading(false); //set loading state
        const val = 'Nutrition';
        props.addSugg(val, points);
        }
        loadPost(); 
      }, [props.reload]);  
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
      // Gray line
      // {
      //   data: DUMMY.map(val => val + (Math.random()-0.5)*),
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
    Please connect a wearable which tracks Nutrition Data
    </div> :
  <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="50" height="50" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <button  onClick={() => { date1W(); } } className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">1 Week</button>
            </li>
            <li>
              <button  onClick={() => {date1M(); } } className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">1 Month</button>
            </li>
            <li>
              <button  onClick={() => { date3M(); }}className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">3 Months</button>
            </li>
          </EditMenu>
        </header>
        
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Nutrition</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Average</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">2658 calories</div>
        
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
        <LineChart data={chartData} width={389} height={128} tick = {"kcal"}/>
      </div>}    
    </div>
   );
}

export default DashboardNutrition;
