import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function Average(array){

  return array.reduce((a,b) => a + b, 0) / array.length

}


function DashboardCard06() {
  const url = "https://0a8a-80-3-12-252.eu.ngrok.io/testing";
  const [Protein, setProtein] = useState((1));
  const [Carbs, setCarbs] = useState((1));
  const [Fat, setFat] = useState((1));
  var parr = [];
  var farr = [];
  var carr = [];
  // const data = {
  //   "startDate": "2022-05-21",
  //   'endDate': '2022-05-22',
  //   'terraId': '596be094-5daa-4962-bd60-0177c9439cec',
  //   'type': 'nutrition'
  // }

    useEffect(() => { // useEffect hook
      const loadPost = async () => {
      console.log("Getting Data");
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        "userID" : "user1", 
        "startDate" : "2022-05-21",
        "endDate": "2022-05-22", 
        "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
        "type": "nutrition", 
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
      });
      for (let user of response) {
        parr.push(user.data.protein_g);
        carr.push(user.data.carbohydrates_g);
        farr.push(user.data.fat_g);
      };
      console.log('PROTEIN is : ', Average(parr));
      console.log('CARBS is : ', Average(carr));
      console.log('FATS is : ', Average(farr));
      console.log('Type of farr is ',typeof(Average(farr)));
      console.log('Retreived Data');
      setProtein(state => (20));
      setCarbs((20));
      setFat((20));
      console.log(Protein);
      console.log(Carbs);
      console.log(Fat);
    }
    loadPost();
    }, []);
  const chartData = {
    labels: ['Carbs', 'Protein', 'Fats'],
    datasets: [
      {
        label: 'User Data',
        data: [
          Protein, Carbs, Fat,
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
