import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';

//Sleep data for health
function DashboardCard03(props) {
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
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [sleepUnder, setSleep ] = useState(false);
  const [startDate, setstartDate ] = useState(getDiffTime('-', 25));
  const [endDate, setendDate ] = useState(localTime());
  const [Data, setData ] = useState();
  const [Dates, setDate ] = useState();
  var times = [];
  var points = [];
  if(props.overrideDate === true){
    setstartDate(props.dates[0]);
    setendDate(props.dates[1]);
    // props.setOverrideDate(false);
  }
  // console.log(props.overrideDate, 'CARD 3 ', startDate, ' <-> ', endDate);
  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    console.log("Getting Sleep Data");
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
        console.log("Axios error");
      });
    // for (let  user of response.result) {
    //   times.push(user.date); 
    //   points.push(user.data/3600);
    // };
    // console.log('123456789 ', response);
    // console.log('CONDITION 2 : ', response.condition); 
    for (let user of response.result) {
      const temp_day = new Date(user.date); 
      if(temp_day.getHours() < 6 && 0 < temp_day.getHours()){
        temp_day.setDate(temp_day.getDate() - 1);
      };  
      const day = temp_day.toISOString().substring(0,10).split('-').reverse().join('-');
      if(times.indexOf(day) == -1){
        times.push(day); 
        points.push(user.data.sleep_durations_data.asleep.duration_asleep_state/3600);
    }};
    
    console.log('BATMAN ', times); 
    
    console.log('IRONMAN ', points); 
    // times = sortedDescending;
    setData(points); //set Time state
    setDate(times); //set Data state
    setLoading(false); //set loading state
    const val = 'Performance'
    props.addSugg(val, points);
    }
    loadPost(); 
    }, []);
    
  const chartData = {
    labels: Dates,
    datasets: [
      // Indigo line
      {
        data: Data,
        label: 'Hours slept',
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
      // Gray line
      // {
      //   data: [
      //     6.89, 5.62, 4.77, 4.77, 4.77, 4.77, 4.58,
      //     3.14, 4.30, 3.78, 4.30, 4.98, 6.42, 3.50,
      //     1.45, 1.45, 3.54, 2.60, 1.88, 1.88, 3.00,
      //     3.00, 2.82, 3.64, 6.60, 5.54,
      //   ],
      //   label: 'Average',
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
      Please connect a wearable which tracks Sleep Data {console.log("loading state")}
      </div> :
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="50" height="50" alt="Icon 03" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Health</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Your Health Data Analysis</div>
        <div className="text-xl font-bold text-slate-800 mr-2">Average : {Average(Data)}</div>
        
        

      </div>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? 
          <div>
            {console.log("loading state")}
          </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} tick = {"sleep"}/>
      </div>}
    </div>
  );
}

export default DashboardCard03;
