import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function Average(array){

  return array.reduce((a,b) => a + b, 0) / array.length

}


function DashboardCard06() {
  const url = "https://0a8a-80-3-12-252.eu.ngrok.io/testing";
  const [isLoading, setLoading ] = useState(true);
  const [Protein, setProtein] = useState();
  const [Carbs, setCarbs] = useState();
  const [Fat, setFat] = useState();
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
      console.log('Retreived Data');
      setLoading(false);
      setProtein(Average(parr));
      setCarbs(Average(carr));
      setFat(Average(farr));
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
          Carbs, Protein, Fat,
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
      { isLoading ? <div>
      Please connect a wearable which tracks Nutrition Data
      </div> :<header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">DIET BREAKDOWN</h2>
          <h6 className="font-semibold text-slate-800">Inner circle is daily guidelines</h6>
          <h6 className="font-semibold text-slate-800">Outer circle is your data</h6>
      </header>
      }
      
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      { isLoading ? <div>
    Please connect a wearable which tracks Nutrition Data
    </div> :
      <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default DashboardCard06;
