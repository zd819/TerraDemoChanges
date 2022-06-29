import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function Analysis2() {
  const url = "https://fb43-2a0c-5bc0-40-2e2f-304f-3c6b-9509-c963.eu.ngrok.io/data";
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
    // console.log(response.json());  
    // console.log(response.at(0));
    console.log('Activity is ',response); 
    // //console.log(response[19].dataPoint);
    // console.log('Retreived Data')
    for (let  user of response) {
      const splitDate = user.date.split('-');
      if(user.data< 2500){
        setActivity(true);
      }
      //console.log("Date :", user.date);
      // console.log("THE DAY IS :", splitDate[0]);
      // console.log("THE MONTH IS :", splitDate[1]);
      // console.log("THE YEAR IS :", splitDate[2]);
      //console.log("User Data :", user.dataPoint);
      times.push(user.date); 
      points.push(user.data);
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


  const Over = "Good Average Activity";
  const Under = "Low Activity";  
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
        data: [
          732, 610, 610, 504, 504, 504, 349,
          349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349,
          252, 423, 622, 470, 532,
        ],
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
    <div className="font-semibold flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
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
            {lowActivity ? Under : Over};
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
