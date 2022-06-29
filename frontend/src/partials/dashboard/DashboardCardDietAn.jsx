import React, { useEffect, useState } from 'react';


function Average(array){

  return array.reduce((a,b) => a + b, 0) / array.length

}

function perDiff(a,b){

  return 100 * (a - b) / b;
}

function DashboardCardDietAn() {
const url = "http://localhost:8080/data";

  const pro_guide = 55.5;
  const carbs_guide = 333;
  const fat_guide = 97;
  const sod_guide = 2400;
  const sug_guide = 85;
  const cal_guide = 2500;

  const [isLoading, setLoading ] = useState(true);
  const [Protein, setProtein] = useState();
  const [Carbs, setCarbs] = useState();
  const [Fat, setFat] = useState();
  const [Sodium, setSodium] = useState();
  const [Sugar, setSugar] = useState();
  const [Calories, setCalories] = useState();
  const [pro_diff, setpro_diff] = useState();
  const [carbs_diff, setcarbs_diff] = useState();
  const [fat_diff, setfat_diff] = useState();
  const [sod_diff, setsod_diff] = useState();
  const [sug_diff, setsug_diff] = useState();
  const [cal_diff, setcal_diff] = useState();
  const [pro_sugg, setpro_sugg] = useState();
  const [carbs_sugg, setcarbs_sugg] = useState();
  const [fat_sugg, setfat_sugg] = useState();
  const [sod_sugg, setsod_sugg] = useState();
  const [sug_sugg, setsug_sugg] = useState();
  const [cal_sugg, setcal_sugg] = useState();

  var pro_arr = [];
  var fat_arr = [];
  var carbs_arr = [];
  var sod_arr = [];
  var sug_arr = [];
  var cal_arr = [];

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
    //push data from mongo into arrays
    for (let user of response.result) {
      pro_arr.push(user.data.protein_g);
      carbs_arr.push(user.data.carbohydrates_g);
      fat_arr.push(user.data.fat_g);
      sod_arr.push(user.data.sodium_mg);
      sug_arr.push(user.data.sugar_g);
      cal_arr.push(user.data.calories);

    };
    // console.log('Retreived Data');
    setLoading(false);
    //obtain averages of user data for each component
    setProtein(Average(pro_arr).toPrecision(3));
    setCarbs(Average(carbs_arr).toPrecision(3));
    setFat(Average(fat_arr).toPrecision(3));
    setSodium(Average(sod_arr).toPrecision(4));
    setSugar(Average(sug_arr).toPrecision(3));
    setCalories(Average(cal_arr).toPrecision(4));

    //find percentage difference between user data and daily guidelines
    setpro_diff(perDiff(Protein, pro_guide).toPrecision(3));
    setcarbs_diff(perDiff(Carbs, carbs_guide).toPrecision(3));
    setfat_diff(perDiff(Fat, fat_guide).toPrecision(3));
    setsod_diff(perDiff(Sodium, sod_guide).toPrecision(3));
    setsug_diff(perDiff(Sugar, sug_guide).toPrecision(3));
    setcal_diff(perDiff(Calories, cal_guide).toPrecision(3));

    //sorting of suggestions for each category
    if(pro_diff >= 0){
      
      setpro_sugg("Well done (not your steak I hope), you're getting enough protein");
    }
    else{

      setpro_sugg("You're not getting enough protein, try eating some more meats or eggs");
    }

    if(carbs_diff >= 0){
      
      setcarbs_sugg("Nice one, you're body will be loving the amount of carbs its getting");
    }
    else{

      setcarbs_sugg("Unfortunately you are not getting enough carbs. Go get some chips or pasta");
    }

    if(fat_diff <= 0){
      
      setfat_sugg("Good work, hope you're eating good");
    }
    else{

      setfat_sugg("Oops, try reducing your dairy intake and avoid red meat");
    }

    if(sod_diff <= 0){
      
      setsod_sugg("Good job, make sure your food is seasoned though");
    }

    else{

      setsod_sugg("Watch out, try lay off the salt a bit");
    }

    if(sug_diff <= 0){
      
      setsug_sugg("Bravo, go treat yourself to something sweet (stay under your goal though)");
    }
    else{

      setsug_sugg("hmmmm, skip out on the desserts here and there");
    }
    if(cal_diff <= 10 && cal_diff >= -10){
      
      setcal_sugg("Congrats, you're getting a good amount of food but not too much");
    }
    else{

      setcal_sugg("Yeah... not quite there yet, so try reducing the size of your meals or give that snack a miss");
    }


  }
  loadPost();
  }, []);

  

  return ( 
    
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
    { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">
      Please connect a wearable which tracks Nutrition Data
      </div>:<header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">DIET ANALYSIS</h2>
        <h6 className="font-semibold text-slate-800">How Can You Improve Your Diet?</h6>
      </header>}
      { isLoading ? <div className=" text-center font-small text-slate-300 hover:text-slate400 ">

      </div> :
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Food Group</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Your Average Intake</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Daily Guideline</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Difference (%)</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">What can you do?</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Protein</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{Protein} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{pro_guide} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{pro_diff}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-red-500">{pro_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Carbs</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{Carbs} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{carbs_guide} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{carbs_diff}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-orange-500">{carbs_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Fat</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{Fat} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{fat_guide} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{fat_diff}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-yellow-500">{fat_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Sodium (g)</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{Sodium} mg</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{sod_guide} mg</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{sod_diff}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">{sod_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Sugar</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{Sugar} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{sug_guide} g</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{sug_diff}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-blue-500">{sug_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Calories</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{Calories} kcal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{cal_guide} kcal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{cal_diff}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-indigo-500">{cal_sugg}</div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>}
    </div>
  );
}

export default DashboardCardDietAn;
