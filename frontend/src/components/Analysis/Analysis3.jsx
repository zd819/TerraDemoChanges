import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

//Sleep data for health
function Analysis3() {
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [sleepUnder, setSleep ] = useState(false);
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    // axios(options)
    console.log("Getting Sleep Data");
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      // "Content-Type": "application/json",
      "userID" : "user1", 
      "startDate" : "2022-05-03",
      "endDate": "2022-05-28", 
      "terraId": "147f9175-e2bf-4122-8694-6a5f75fb4b60",
      "type": "sleep", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });
    // console.log(response.json());  
    // console.log(response.at(0));
    console.log('Sleep is ',response); 
    // //console.log(response[19].dataPoint);
    // console.log('Retreived Data')
    for (let  user of response) {
      const splitDate = user.date.split('-');
      if(user.data < 6 ){
        setSleep(true);
      }
      //console.log("Date :", user.date);
      // console.log("THE DAY IS :", splitDate[0]);
      // console.log("THE MONTH IS :", splitDate[1]);
      // console.log("THE YEAR IS :", splitDate[2]);
      //console.log("User Data :", user.dataPoint);
      times.push(user.date); 
      points.push(user.data/3600);
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
    setData(points); //set Data state
    setDate(times); //set Time state
    setLoading(false); //set loading state
    }
    loadPost(); 
    }, []);

    const Over = "Good Amounts of Sleep";
    const Under = "Careful of Sleep Deprivation";  
  const chartData = {
    labels: Date,
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
      {
        data: [
          6.89, 5.62, 4.77, 4.77, 4.77, 4.77, 4.58,
          3.14, 4.30, 3.78, 4.30, 4.98, 6.42, 3.50,
          1.45, 1.45, 3.54, 2.60, 1.88, 1.88, 3.00,
          3.00, 2.82, 3.64, 6.60, 5.54,
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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div>
      Please connect a wearable which tracks Sleep Data {console.log("loading state")}
      </div> :
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="50" height="50" alt="Icon 03" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Health</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Your Health Data Analysis</div>
        <div className="text-3xl font-bold text-slate-800 mr-2">3 Months Ago</div>
        <div className={'text-sm font-semibold text-white px-1.5 rounded-full ' + (sleepUnder ? 'bg-yellow-500' : 'bg-green-500')}>
            {sleepUnder ? Under : Over};
        </div>

      </div>}
      {/* Chart built with Chart.js 3 */}
      { isLoading ? 
          <div>
            {console.log("loading state")}
          </div> :
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>}
    </div>
  );
}

export default Analysis3;
