import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import localTime from '../../components/DataHandling/localTime.js';
import getDiffTime from '../../components/DataHandling/getDiffTime.js';

function DashboardCard08(props) {
  const url = "https://2782-80-3-12-252.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [calorieOver, setCalories ] = useState(false);
  const [startDate, setstartDate ] = useState(getDiffTime('-', 25));
  const [endDate, setendDate ] = useState(localTime());
  const [Avg, setAvg ] = useState();
  const [High, setHigh ] = useState();
  const [Low, setLow ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var avgHR = [];
  var highHR = [];
  var lowHR = [];
  
  useEffect(() => { // useEffect hook
    const loadPost = async () => {
      console.log('Getting Health Data');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        "userID" : "user1", 
        "startDate" : startDate,
        "endDate": endDate, 
        "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
        "type": "heart",
        "provider" : "OURA", 
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
        });
      console.log('ASHBORN :   <-> ', response.result);
      for (let user of response.result) {
        if((times.indexOf(user.date) == -1)){
          const day = (user.date.split('-'));
          const newDate = day[1] + '-' + day[0] + '-' + day[2]; 
          times.push(newDate); 
          avgHR.push(user.data.avg_hr);
          highHR.push(user.data.max_hr);
          lowHR.push(user.data.min_hr);
        }  
      };
      setAvg(avgHR); //set Time state
      setHigh(highHR); //set Time state
      setLow(lowHR); //set Time state
      setDate(times); //set Data state
      setLoading(false); //set loading state
      // const val = 'Nutrition';
      // props.addSugg(val, points);
      }
      loadPost(); 
    }, []);  
  const chartData = {
    labels: Date,
    datasets: [
      // Indigo line
      {
        label: 'Avg Heart Rate',
        data: Avg,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
      },
      // Blue line
      {
        label: 'Maximum',
        data: High,
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
      },
      // Green line
      {
        label: 'Resting',
        data: Low,
        borderColor: tailwindConfig().theme.colors.green[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      { isLoading ? <div>
        Please connect a wearable which tracks Nutrition Data
        </div> :
    <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">CardioVascular Health</h2>
      </header>}
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      { isLoading ? <div>
      </div> :
        <LineChart data={chartData} width={595} height={248} tick ={"bpm"}/>
    }
    </div>
  );
}

export default DashboardCard08;
