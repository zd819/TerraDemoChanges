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

  const url = "https://6777-82-69-42-98.eu.ngrok.io/data";
  const DUMMY = [
    732, 610, 610, 504, 504, 504, 349,
    349, 504, 342, 504, 610, 391, 192,
    154, 273, 191, 191, 126, 263, 349,
    252, 423, 622, 470, 532,
  ].map(val => (Math.random()-0.5)*1000 + 2500);
  const DUMMY2 = [
    '12-01-2020', '01-01-2021', '02-01-2021',
    '03-01-2021', '04-01-2021', '05-01-2021',
    '06-01-2021', '07-01-2021', '08-01-2021',
    '09-01-2021', '10-01-2021', '11-01-2021',
    '12-01-2021', '01-01-2022', '02-01-2022',
    '03-01-2022', '04-01-2022', '05-01-2022',
    '06-01-2022', '07-01-2022', '08-01-2022',
    '09-01-2022', '10-01-2022', '11-01-2022',
    '12-01-2022', '01-01-2023',
  ];
  const [isLoading, setLoading ] = useState(false);
  const [calorieOver, setCalories ] = useState(false);
  const [startDate, setstartDate ] = useState(getDiffTime('-', 30));
  const [endDate, setendDate ] = useState(localTime());
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
  const terraData = []
  const green = "bg-green-500";
  const yellow = "bg-yellow-500";
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
          "userID" : "user1", 
          "startDate" : startDate,
          "endDate": endDate, 
          "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
          "type": "nutrition",
          "provider" : "MYFITNESSPAL", 
        }}).then((res =>  {console.log('ASHBORN : ', res.result.calories);res.json();}))
        .catch(function(error){
            console.log(error);
          });
        // console.log('NEW RESPONSE IS : ', response , ' and result is : ', response.result.calories);
        // for (let user of response.result) {
        //   times.push(user.date);
        //   points.push(user.data);
        // };
        for (let user of response.result) {
            times.push(user.date); 
            points.push(user.data);
        };
        let values = response.result;
        let sortedDescending = values.sort((a, b) => {
          const aDate = a.date.split('-');
          const bDate = b.date.split('-');
          if(aDate[2]!=bDate[2]){
            return aDate[2]-bDate[2];
          }
          else if(aDate[1]!=bDate[1]){
            return aDate[1]-bDate[1];
          }
          else return aDate[0]-bDate[0];
        });
        
        console.log('NUTRITION is ', points); 
        //console.log('Sorted dates', sortedDescending);
        // times = sortedDescending;
        setData(points); //set Time state
        setDate(times); //set Data state
        setLoading(false); //set loading state
        const val = 'Nutrition';
        props.addSugg(val, points);
        }
        loadPost(); 
      }, []);  
  const chartData = {
    labels: DUMMY2,
    datasets: [
      // Indigo line
      {
        data: DUMMY,
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
  { isLoading ? <div>
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
          {/* <div className={'text-sm font-semibold text-white px-1.5 rounded-full ' + (calorieOver ? 'bg-yellow-500' : 'bg-green-500')}>
          {props.sugg}
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
      </div>}    
    </div>
   );
}

export default DashboardNutrition;
