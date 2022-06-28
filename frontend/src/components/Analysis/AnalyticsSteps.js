import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../../partials/EditMenu.jsx';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function AnalyticsSteps(props) {
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [lowActivity, setActivity ] = useState(false);
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
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
      "startDate" : "2022-05-03",
      "endDate": "2022-05-28", 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "daily", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });
    console.log('Activity is ',response); 
    for (let user of response.result) {
      const day = (user.date.split('-'));
      const newDate = day[1] + '-' + day[0] + '-' + day[2]; 
      if(times.indexOf(newDate) == -1){
        times.push(newDate); 
        points.push(user.data);
    }};
    setData(points); //set Time state
    setDate(times); //set Data state
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
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
    Please connect a wearable which tracks Activity Data {console.log("loading state")}
    </div> :
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="50" height="50" alt="Icon 02" />
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

export default AnalyticsSteps;
