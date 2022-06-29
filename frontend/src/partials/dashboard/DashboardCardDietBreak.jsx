import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function Average(array){

  return array.reduce((a,b) => a + b, 0) / array.length

}


function DashboardCardDietBreak() {
  const url = "https://980d-2a02-6b6a-8c49-0-b903-d7a2-2ebb-9e6f.eu.ngrok.io/data";
  const [isLoading, setLoading ] = useState(true);
  const [Protein, setProtein] = useState();
  const [Carbs, setCarbs] = useState();
  const [Fat, setFat] = useState();
  var pro_arr = [];
  var fat_arr = [];
  var carbs_arr = [];
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
        "Content-Type": "application/json",
        "userID" : "user1", 
        "startDate" : "2022-05-17",
        "endDate": "2022-05-28", 
        "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
        "type": "nutrition", 
        "provider": "MYFITNESSPAL",
      }}).then((res => res.json()))
      .catch(function(error){
          console.log(error);
      });
      //pushing data from mongo into arrays
      for (let user of response.result) {
        pro_arr.push(user.data.protein_g);
        carbs_arr.push(user.data.carbohydrates_g);
        fat_arr.push(user.data.fat_g);
      };
      // console.log('Retreived Data');
      setLoading(false);
      //averaging out of arrays tp get single point to plotted
      setProtein(Average(pro_arr).toPrecision(3));
      setCarbs(Average(carbs_arr).toPrecision(3));
      setFat(Average(fat_arr).toPrecision(3));
     
    }
    loadPost();
    }, []);
  const chartData = {
    labels: ['Carbs', 'Protein', 'Fats'],
    //plot for user's average data
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
        //plot for daily guidelines
        label: 'Daily Guidelines',
        data: [
          333, 55.5, 97,
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
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
      Please connect a wearable which tracks Nutrition Data
      </div> : <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">DIET BREAKDOWN</h2>
          <h6 className="font-semibold text-slate-800">Inner circle is daily guidelines</h6>
          <h6 className="font-semibold text-slate-800">Outer circle is your data</h6>
      </header>
      }
      
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
    Please connect a wearable which tracks Nutrition Data
    </div> :
      <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default DashboardCardDietBreak;
