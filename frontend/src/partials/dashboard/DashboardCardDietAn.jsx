import React, { useEffect, useState } from 'react';


function Average(array){

  return array.reduce((a,b) => a + b, 0) / array.length

}

function perDiff(a,b){

  return 100 * (a - b) / b;
}

function DashboardCardDietAn() {
const url = "https://be19-80-3-12-252.eu.ngrok.io/testing";

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
      "userID" : "user1", 
      "startDate" : "2022-05-17",
      "endDate": "2022-05-28", 
      "terraId": "596be094-5daa-4962-bd60-0177c9439cec",
      "type": "nutrition", 
    }}).then((res => res.json()))
    .catch(function(error){
        console.log(error);
    });
    //push data from mongo into arrays
    for (let user of response) {
      pro_arr.push(user.data.protein_g);
      carbs_arr.push(user.data.carbohydrates_g);
      fat_arr.push(user.data.fat_g);
      sod_arr.push(user.data.sodium_mg);
      sug_arr.push(user.data.sugar_g);
      cal_arr.push(user.data.calories);

    };
    console.log('Retreived Data');
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

      setcarbs_sugg("Yikes, how are you not getting enough carbs? Go get some chips or pasta");
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
      
      setsug_sugg("Bravo, go treat yourself to something sweet (stay under your goal tho)");
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
    { isLoading ? <div>
      Please connect a wearable which tracks Nutrition Data
      </div>:<header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">DIET ANALYSIS</h2>
        <h6 className="font-semibold text-slate-800">How can you improve your diet?</h6>
      </header>}
      { isLoading ? <div>
      Please connect a wearable which tracks Nutrition Data
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
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <path d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" fill="#FFF" />
                    </svg>
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
                  <div className="text-center text-sky-500">{pro_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#1DA1F2" cx="18" cy="18" r="18" />
                      <path d="M26 13.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H10c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" fill="#FFF" fillRule="nonzero" />
                    </svg>
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
                  <div className="text-center text-sky-500">{carbs_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#EA4335" cx="18" cy="18" r="18" />
                      <path d="M18 17v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C21.6 11.7 20 11 18.1 11c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H18z" fill="#FFF" fillRule="nonzero" />
                    </svg>
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
                  <div className="text-center text-sky-500">{fat_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#4BC9FF" cx="18" cy="18" r="18" />
                      <path d="M26 14.3c-.1 1.6-1.2 3.7-3.3 6.4-2.2 2.8-4 4.2-5.5 4.2-.9 0-1.7-.9-2.4-2.6C14 19.9 13.4 15 12 15c-.1 0-.5.3-1.2.8l-.8-1c.8-.7 3.5-3.4 4.7-3.5 1.2-.1 2 .7 2.3 2.5.3 2 .8 6.1 1.8 6.1.9 0 2.5-3.4 2.6-4 .1-.9-.3-1.9-2.3-1.1.8-2.6 2.3-3.8 4.5-3.8 1.7.1 2.5 1.2 2.4 3.3z" fill="#FFF" fillRule="nonzero" />
                    </svg>
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
                  <div className="text-center text-sky-500">{sod_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#0E2439" cx="18" cy="18" r="18" />
                      <path d="M14.232 12.818V23H11.77V12.818h2.46zM15.772 23V12.818h2.462v4.087h4.012v-4.087h2.456V23h-2.456v-4.092h-4.012V23h-2.461z" fill="#E6ECF4" />
                    </svg>
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
                  <div className="text-center text-sky-500">{sug_sugg}</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#4BC9FF" cx="18" cy="18" r="18" />
                      <path d="M26 14.3c-.1 1.6-1.2 3.7-3.3 6.4-2.2 2.8-4 4.2-5.5 4.2-.9 0-1.7-.9-2.4-2.6C14 19.9 13.4 15 12 15c-.1 0-.5.3-1.2.8l-.8-1c.8-.7 3.5-3.4 4.7-3.5 1.2-.1 2 .7 2.3 2.5.3 2 .8 6.1 1.8 6.1.9 0 2.5-3.4 2.6-4 .1-.9-.3-1.9-2.3-1.1.8-2.6 2.3-3.8 4.5-3.8 1.7.1 2.5 1.2 2.4 3.3z" fill="#FFF" fillRule="nonzero" />
                    </svg>
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
                  <div className="text-center text-sky-500">{cal_sugg}</div>
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
