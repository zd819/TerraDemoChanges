import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02() {
  const url = "https://6777-82-69-42-98.eu.ngrok.io/testing";
  const [isLoading, setLoading ] = useState(true);
  const [sleepUnder, setSleep ] = useState(false);
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];
  useEffect(() => { // useEffect hook
    const loadPost = async () => {
    // axios(options)
    console.log("Getting Data");
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      // "Content-Type": "application/json",
      "userID" : "user1", 
      "startDate" : "2022-04-29",
      "endDate": "2022-05-24", 
      "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
      "type": "Health", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
        console.log("Axios error");
      });
    // console.log(response.json());  
    // console.log(response.at(0));
    // console.log('Response is ',response); 
    // //console.log(response[19].dataPoint);
    // console.log('Retreived Data')
    for (let  user of response) {
      const splitDate = user.date.split('-');
      if(user.dataPoint> 3800){
        setSleep(true);
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

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '06-01-2021', '07-01-2021', '08-01-2021',
      '09-01-2021', '10-01-2021', '11-01-2021',
      '12-01-2021', '01-01-2022', '02-01-2022',
      '03-01-2022', '04-01-2022', '05-01-2022',
      '06-01-2022', '07-01-2022', '08-01-2022',
      '09-01-2022', '10-01-2022', '11-01-2022',
      '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [
          622, 622, 426, 471, 365, 365, 238,
          324, 288, 206, 324, 324, 500, 409,
          409, 273, 232, 273, 500, 570, 767,
          808, 685, 767, 685, 685,
        ],
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
    Please connect either FitBit, TrainingPeaks, or Withings {console.log("loading state")}
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
