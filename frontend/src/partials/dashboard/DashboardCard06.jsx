import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DoughnutChart from '../../charts/DoughnutChart';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function Average(array){

  return array.reduce((a,b) => a + b, 0) / array.length

}


function DashboardCard06() {

  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();
  const url = "https://6777-82-69-42-98.eu.ngrok.io/testing";
  const [Data, setData ] = useState();
  const [Date, setDate ] = useState();
  var times = [];
  var points = [];

  const data = {
    "startDate": "2022-05-24",
    'endDate': '2022-05-31',
    'terraId': '596be094-5daa-4962-bd60-0177c9439cec',
    'type': 'nutrition breakdown'
  }

  const options = {
    url: "https://e176-62-23-207-10.eu.ngrok.io/testing",
    headers: {'Content-Type':'application/json',
    'userId': 'user1'},
    data: JSON.stringify(data), 
    method: 'GET'
    };
  
    useEffect(() => { // useEffect hook
      const loadPost = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        "userID" : "user1", 
        "startDate" : "2022-05-24",
        "endDate": "2022-05-31", 
        "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
        "type": "nutrition breakdown", 
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
        });

      setProtein(Average(response[0]));
      setCarbs(Average(response[1]));
      setFat(Average(response[2]));
      console.log(protein);
      console.log(carbs);
      console.log(fat);

    }
  } );
  const chartData = {
    labels: ['Carbs', 'Protein', 'Fats'],
    datasets: [
      {
        label: 'User Data',
        data: [
          protein, carbs, fat,
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },

      {
        label: 'Daily Guidelines',
        data: [
          55.5, 333, 97,
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">DIET BREAKDOWN</h2>
        <h6 className="font-semibold text-slate-800">Inner circle is daily guidelines</h6>
        <h6 className="font-semibold text-slate-800">Outer circle is your data</h6>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
