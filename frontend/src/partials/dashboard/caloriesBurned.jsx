import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CaloriesBurned(props) {
  function date1W(){
    setstartDate(getDiffTime('-', 7));
  }
  function date1M(){
    setstartDate(getDiffTime('-', 30));
  }
  function date3M(){
    setstartDate(getDiffTime('-', 90));
  }
  function Average(array){
    return array.reduce((a,b) => a + b, 0) / array.length
  }
  const url = "http://localhost:8080/data";
  const [isLoading, setLoading ] = useState(true);
  const [lowActivity, setActivity ] = useState(false);
  const [startDate, setstartDate ] = useState(getDiffTime('-', 25));
  const [endDate, setendDate ] = useState(localTime());
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];

  if(props.overrideDate === true){
    setstartDate(props.dates[0]);
    setendDate(props.dates[1]);
  }

  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    // axios(options)
    console.log("Getting Activity Data");
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      "userID" : "user1",
      "startDate" : startDate,
      "endDate": endDate, 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "daily", 
      "provider" : "OURA", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });

    for (let user of response.result) {
      const day = user.date.substring(0,10).split('-').reverse().join('-');
      if(times.indexOf(day) == -1){
        times.push(day); 
        points.push(user.data.calories_data.total_burned_calories); 
      }
    };
   
    
    setData(points); //set Time state
    setDate(times); //set Data state
    setLoading(false); //set loading state
    const val = 'Health'
    props.addSugg(val, points);
    }
    loadPost(); 
    }, []);

  const chartData = {
    labels: Date,
    datasets: [
      {
        data: Data,
        label: 'Calories Burned',
        fill: true,
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
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 " >
    Please connect a wearable which tracks Activity Data {console.log("loading state")}
    </div> :
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="50" height="50" alt="Icon 02" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Performance</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Your Performance Data Analysis</div>
        <div className="text-xl font-bold text-slate-800 mr-2">Average : {Average(Data)}</div>
         
      </div>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div>
     {console.log("loading state")}
    </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} tick = {"consumed"}/>
      </div>}
    </div>
  );
}

export default CaloriesBurned;
