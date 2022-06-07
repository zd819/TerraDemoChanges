import React, { useEffect, useState } from 'react';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';

import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DashboardTest from '../partials/dashboard/DashboardTest';
import General1 from '../components/Suggestions/General1';
//import Banner from '../partials/Banner';

class DashboardMoz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        lists: [], 
        items:[],
        payloads:[],
        data:[],
        sidebarOpen :false,
        allData : {}
    };
  
    this.openSidebar = this.openSidebar.bind(this)
    this.addItem = this.addItem.bind(this)
    this.addData = this.addData.bind(this)
    this.addSugg = this.addSugg.bind(this)
    this.addPayload = this.addPayload.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }

  openSidebar(val) {
    this.setState({
      sidebarOpen : val
    })
  }

  addItem (item) {
    this.setState({
      items: this.state.items.concat(item)
    })
  }

  addData (item) {
    this.setState({
      data: this.state.data.concat(item)
    })
  }

  addPayload (item) {
    this.setState({
      payloads: this.state.payloads.concat(item)
    })
  }
  
  addSugg (key,data) {
    var dict2 = this.state.allData; 
    // dict2 = {key.replace('"', ''):val for key, val in dict2}
    dict2[key] = data;
    this.setState({
      allData: dict2
    })
  }

  updateItem(id, updatedItem) {
    this.setState({
      items: this.state.items.map(function (item) {
        if (item.itemId !== id) return item;
        return updatedItem;
      })
    })
  }
  removeItem(id) {
    this.setState({
      items: this.state.items.filter(function(item) {
        return item.itemId !== id
      })
    })
  }

  createSuggestion() {
    if(Object.keys(this.state.allData).length > 0){


    }
  }
  
  // changeColor = (props) => {
  //   this.setState({connected: props});
  // }

//   add(item){
//     let newEmp=[item]
//     this.setEmps([...this.emps,newEmp])
// }

  // handleAddList(){
  //   // creating empty object, assigning it to current value of items 
  //   // then adding another property to it
  //   var items = Object.assign({}, this.state.lists, {"temp": "something"})
    
  //   // setting the state with the new values
  //   this.setState({
  //     lists: ["new"],
  //     connected: items
  //   })
  // }

  render(){
    
  const test = [1,2,3,4,5,6,7];
  // console.log("HERE I COME", this.state.data)
  // console.log("PAYLOADS ARE", this.state.payloads)
  console.log("DICTIONARY OF SUGGESTIONS", this.state.allData)
  console.log("DICTIONARY LENGTH", Object.keys(this.state.allData).length)
  console.log("NUTRITION",this.state.allData.Nutrition)
  console.log("Keys of Suggestion DIctionary : ", Object.keys(this.state.allData))
  var health = Object.keys(this.state.allData)[0]
  console.log("Sleep", this.state.allData['Sleep'])
  console.log("Health", this.state.allData['Health'])
  console.log("Performance", this.state.allData['Performance'])
  var PerformanceSugg = General1(this.state.allData, "Performance")
  var HealthSugg = General1(this.state.allData, "Health")
  var NutritionSugg = General1(this.state.allData, "Sleep")
  console.log("Suggestion1 : ", PerformanceSugg)
  console.log("Suggestion type is : ", typeof(PerformanceSugg))
  console.log("Checking the Logging Async functions : ", this.state.items)
  const arr = {"1":"11","2":"22","3":[1,2,3,4,5]};
  console.log("Array : ", arr);
  console.log("Array 3 : ", arr["3"]);
  console.log("Array Type : " , typeof(arr));
  console.log("Data Type: " , typeof(this.state.allData));
  console.log("Health Type : " , typeof(this.state.allData["Health"]));
  console.log("Sleep Type : " , typeof(this.state.allData["Sleep"]));
  console.log("Nutrition Type : " , typeof(this.state.allData["Nutrition"]));

  return (
    <div className="flex h-screen overflow-hidden bg-blue-50">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={this.sidebarOpen} setSidebarOpen={this.openSidebar} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={this.sidebarOpen} setSidebarOpen={this.openSidebar} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8 ">


              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                
                
                {/* Add view button */}
                            
              </div>
              {/* Filter button */}
             
              <Datepicker />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* Line chart (TEST) */}
              {/* <DashboardTest addSugg = {this.addSugg} sugg = {result1} /> */}
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 addSugg = {this.addSugg} sugg = {NutritionSugg} />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 addSugg = {this.addSugg} sugg = {PerformanceSugg} />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 addSugg = {this.addSugg} sugg = {HealthSugg}/>
              {/* <Sample />
              <button onClick={() => Sample.this.addItem("TESTING")}>do action</button> */}
              {/* <h1> TESTING 123, {this.state.items}</h1> */}
              {/* <button onClick={() => this.addData("TESTING")}>do action </button>  */}

            </div>

          </div>
        </main>

       
        {/* <Routes>
            <Route path="/test" element={<DashboardCard03 />} />
        </Routes> */}
      </div>
    </div>
  );
}};

export default DashboardMoz;