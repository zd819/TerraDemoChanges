import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/sleep.svg';
import EditMenu from '../EditMenu';
import localTime from '../../components/DataHandling/localTime.js';
import getDIffTime from '../../components/DataHandling/getDiffTime.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function date1W(){
  return getDIffTime('-', 7);
}
function date1M(){
  return getDIffTime('-', 30);
}
function date3M(){
  return getDIffTime('-', 90);
}

function DashboardTest(props) {
  console.log('123 : ', props.id)
  const Data = [
    732, 610, 610, 504, 504, 504, 349,
    349, 504, 342, 504, 610, 391, 192,
    154, 273, 191, 191, 126, 263, 349,
    252, 423, 622, 470, 532,
  ].map(val => (Math.random()-0.5)*10 + 40)
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
        data: Data,
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
        data: Data.map(val => val + (Math.random()-0.5)*10),
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
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" /> {/*className = {'fill-current text-red-600'} */}
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">REM SLEEP</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Average</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">47 mins</div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
      {/* <button onClick={() => addSugg("TEST",{Data})}> ADDING HEALTH </button>  */}

    </div>
  );
}

export default DashboardTest;