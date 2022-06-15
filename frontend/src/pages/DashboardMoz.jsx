import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import localTime from '../components/DataHandling/localTime.js';
import getDiffTime from '../components/DataHandling/getDiffTime';
import convertDate from '../components/DataHandling/convertDate';

import Datepicker from '../partials/actions/Datepicker';
import DashboardNutrition from '../partials/dashboard/DashboardNutrition';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCardDietBreak from '../partials/dashboard/DashboardCardDietBreak';
import DashboardCardDietAn from '../partials/dashboard/DashboardCardDietAn';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DashboardTest from '../partials/dashboard/DashboardTest';
import General1 from '../components/Suggestions/General1';

// function useGetLocation(){
//   const logoutUser = () => {
//     const location = useLocation();
//     return location.state;
//   }
//   return {logoutUser}
// }

class DashboardMoz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dates: [], 
        overrideDate : false,
        items:[],
        payloads:[],
        data:[],
        sidebarOpen :false,
        allData : {},
        id : this.props.id,
    };
  
    this.openSidebar = this.openSidebar.bind(this)
    this.addSugg = this.addSugg.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.setDates = this.setDates.bind(this)
    this.setOverrideDate = this.setOverrideDate.bind(this)
  }

  openSidebar(val) {
    this.setState({
      sidebarOpen : val
    })
  }

  addSugg (key,data) {
    var dict2 = this.state.allData; 
    dict2[key] = data;
    this.setState({
      allData: dict2
    })
  }

  setID(){
    this.setState({
      id : this.props.id
    })
  }

  setOverrideDate(newV){
    this.setState({
      overrideDate : newV
    })
  }

  setDates(val){
    this.setState({
      dates : val
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
  render(){
    
  var PerformanceSugg = General1(this.state.allData, "Performance");
  var HealthSugg = General1(this.state.allData, "Health");
  var NutritionSugg = General1(this.state.allData, "Sleep");
  console.log('PAST 30 DATE IS : ', getDiffTime('-',60));
  console.log('ZYZZ DATE IS : ', localTime());
  console.log('456 : ', this.props.id);
  console.log('OLD : ', this.state.dates);
  if(this.state.overrideDate == true){
    console.log('12345');
  }
  if(this.state.dates.length == 2 && this.state.overrideDate == true){
    var temp = [];
    console.log('LENGTH IS 2');
    for( let item of this.state.dates ){
      console.log('CHANGED : ', convertDate(item));
      temp.push(convertDate(item)) ;
    };
    console.log('TEMP IS: ', temp);
    // var x = this.state.dates.map(item => convertDate(item));
    this.setDates(temp);
    console.log('NEW  : ', this.state.dates);
    this.setOverrideDate(false);
  }
  

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
             
              <Datepicker addDate = {this.setDates} override = {this.setOverrideDate}/>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* Line chart (TEST) */}
              <DashboardTest addSugg = {this.addSugg} sugg = {NutritionSugg} id={this.props.id} />
              {/* Line chart (Acme Plus) */}
              <DashboardNutrition addSugg = {this.addSugg} sugg = {NutritionSugg} id={this.props.id} />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 addSugg = {this.addSugg} sugg = {PerformanceSugg} id={this.props.id} />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 addSugg = {this.addSugg} sugg = {HealthSugg} id={this.props.id}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}};

export default DashboardMoz;