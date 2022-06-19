import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02(props) {
  function date1W(){
    setendDate(getDiffTime('-', 7));
  }
  function date1M(){
    setendDate(getDiffTime('-', 30));
  }
  function date3M(){
    setendDate(getDiffTime('-', 90));
  }
  const url = "https://6777-82-69-42-98.eu.ngrok.io/testing";
  const [isLoading, setLoading ] = useState(true);
  const [lowActivity, setActivity ] = useState(false);
  const [Data, setData ] = useState();
  const [startDate, setstartDate ] = useState(getDiffTime('-', 25));
  const [endDate, setendDate ] = useState(localTime());
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
  if(props.overrideDate === true){
    setstartDate(props.dates[0]);
    setendDate(props.dates[1]);
    // props.setOverrideDate(false);
  }
  console.log(props.overrideDate, 'CARD 2 ', startDate, ' <-> ', endDate);

  // const cdate = new Date().getDate();
  // console.log('DATE', cdate);
  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    // axios(options)
    console.log("Getting Activity Data");
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      // "Content-Type": "application/json",
      "userID" : "user1", 
      "startDate" : startDate,
      "endDate": endDate, 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "daily", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });
    // console.log('Activity is ',response); 
    // for (let  user of response.result) {
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
    
    
    // times = sortedDescending;
    setData(points); //set Time state
    setDate(times); //set Data state
    console.log('ACTIVITY 1 is ', Date); 
    console.log('ACTIVITY 2 is ', Data); 
    setLoading(false); //set loading state
    const val = 'Health'
    props.addSugg(val, points);
    }
    loadPost(); 
    }, []);

  var gray = [
      732, 610, 610, 504, 504, 504, 349,
      349, 504, 342, 504, 610, 391, 192,
      154, 273, 191, 191, 126, 263, 349,
      252, 423, 622, 470, 532,
    ];
  const grey = gray.map(v => v*10);
  const chartData = {
    labels: Date,
    datasets: [
      // Indigo line
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
      // Gray line
      {
        data : grey,
        label: 'Average',
        borderColor: tailwindConfig().theme.colors.slate[300],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div>
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
        <div className="text-3xl font-bold text-slate-800 mr-2">3 Months Ago</div>
        <div className={'text-sm font-semibold text-white px-1.5 rounded-full ' + (lowActivity ? 'bg-yellow-500' : 'bg-green-500')}>
            {/* {lowActivity ? Under : Over} */}
            {props.sugg}
          </div>
      </div>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? <div>
     {console.log("loading state")}
    </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>}
    </div>
  );
}

export default DashboardCard02;
