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

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

  
  

function DashboardCard01() {
  const url = "https://6777-82-69-42-98.eu.ngrok.io/testing";
  const [isLoading, setLoading ] = useState(true);
  const [calorieOver, setCalories ] = useState(false);
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
  const terraData = []
  const green = "bg-green-500";
  const yellow = "bg-yellow-500";
  const data = {
    "startDate": "2022-04-29",
    'endDate': '2022-05-24',
    'terraId': '596be094-5daa-4962-bd60-0177c9439cec',
    'type': 'nutrition'
  }
  const options = {
    url: "https://6777-82-69-42-98.eu.ngrok.io/testing",
    headers: {'Content-Type':'application/json',
    'userId': 'user1'},
    data: JSON.stringify(data), 
    method: 'GET'
    };
  
  useEffect(() => { // useEffect hook
      const loadPost = async () => {
      // axios(options)
      //console.log("Getting Data");
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        // "Content-Type": "application/json",
        "userID" : "user1", 
        "startDate" : "2022-04-29",
        "endDate": "2022-05-24", 
        "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
        "type": "nutrition", 
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
          // console.log("Axios error");
        });
      // console.log(response.json());  
      // console.log(response.at(0));
      // console.log('Response is ',response); 
      // //console.log(response[19].dataPoint);
      // console.log('Retreived Data')
      for (let  user of response) {
        const splitDate = user.date.split('-');
        if(user.dataPoint> 3800){
          setCalories(true);
        }
        //console.log("Date :", user.date);
        // console.log("THE DAY IS :", splitDate[0]);
        // console.log("THE MONTH IS :", splitDate[1]);
        // console.log("THE YEAR IS :", splitDate[2]);
        //console.log("User Data :", user.dataPoint);
        times.push(user.date); 
        points.push(user.dataPoint);
      };
      let sortedDescending = response.sort((a, b) => {
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
      //console.log('Sorted dates', sortedDescending);
      times = sortedDescending;
      setData(points); //set Time state
      setDate(times); //set Data state
      setLoading(false); //set loading state
      }
      loadPost(); 
      }, []);
  //console.log('Logged data', Data);
  //console.log('Logged DATES', Date);
  //var payload =  getData();
  // var dataHealth = payload[0];
  // setLoading(payload[1]);
  // if(dataHealth == null){
  //   setLoading(true);
  // }
  
  
  // if(props == null){
  //   console.log('Props NOT PASSED');
  // }else{
  //   console.log('Props passed to Dashboard');
  //   console.log(props);
  // }
  // var newTimes = props.map(function(ConvertTime) { 
  //   ConvertTime.data = ConvertTime.data.split(','); 
  //   return e;
  // });
  // const newTimes2 = props.map(stringX => ConvertTime(stringX));
  
  const Over = "Too Many Calories Consumed";
  const Under = "Good amount of Calories Consumed";
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
      // Gray line
      // {
      //   data: [
      //     532, 532, 532, 404, 404, 314, 314,
      //     314, 314, 314, 234, 314, 234, 234,
      //     314, 314, 314, 388, 314, 202, 202,
      //     202, 202, 314, 720, 642,
      //   ],
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

  // { isLoading ? <div>
  //   Loading the data {console.log("loading state")}
  //   </div> : null}
  
  // if(isLoading){
  //   <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
  //         <div className="px-5 pt-5">
  //           Loading Health Data from MYFITNESSPAL
  //         </div>
  //   </div>
  // }else{
  return (
 <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
  { isLoading ? <div>
    Loading the data
    </div> :
  <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="50" height="50" alt="Icon 01" />
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
        
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Nutrition</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Your Nutrition Data Analysis</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">3 Months Ago</div>
          <div className={'text-sm font-semibold text-white px-1.5 rounded-full ' + (calorieOver ? 'bg-yellow-500' : 'bg-green-500')}>
            {calorieOver ? Over : Under};
          </div>
        </div>
  </div>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div>
    Loading the data 
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

export default DashboardCard01;
