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
import ImageSugg1 from '../partials/dashboard/ImageSugg1.js';
import ImageSugg2 from '../partials/dashboard/ImageSugg2.js';
import ImageSugg3 from '../partials/dashboard/ImageSugg3.js';
import Awaiting from '../components/Dashboard/awaiting';
import PollData from '../components/Dashboard/PollData';
import { defineLocale } from 'moment';
import deleteUser from '../components/Dashboard/deleteUser';

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
        connected : [],
        timer : 0,
        reload : false
    };
    this.setSidebarOpen = this.setSidebarOpen.bind(this)
    this.addSugg = this.addSugg.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.setDates = this.setDates.bind(this)
    this.setOverrideDate = this.setOverrideDate.bind(this)
    this.setConnected = this.setConnected.bind(this)
    this.setReload = this.setReload.bind(this)
    this.checkFitness = this.checkFitness.bind(this)
  }

  setReload(val){
    this.setState({
      reload : val
    })
  }

  setSidebarOpen(val) {
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
    console.log('OVVERIDE : ', newV);
    this.setState({
      overrideDate : newV
    })
  }

  setDates(data){
    this.setState({
      dates : data
    })
  }

  setConnected(data){
    this.setState({
      connected : [data]
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

  checkFitness(){
    console.log('NUT IS : ', this.state.connected.indexOf('MYFITNESSPAL') == -1);
    // return this.state.connected.indexOf('MYFITNESSPAL') == -1;
    return this.state.connected.findIndex(val => val == 'MYFITNESSPAL');
  }

  componentDidMount() {
    // console.log('MOUNTED ', awaiting());
    this.timer = setInterval(()=> {
      if((this.state.connected !== Awaiting(this.props.id, this.setConnected))){
        this.setConnected(Awaiting(this.props.id, this.setConnected));
      }
      // console.log('12321 : ', typeof(Awaiting(this.props.id, this.setConnected)) );
      // this.props.setReload(true);
    }, 10000);
  }
  
  componentWillUnmount() {
    this.timer = null; // here...
    
    window.addEventListener("beforeunload", (ev) => 
    {  
    ev.preventDefault();
    deleteUser(this.props.id);
    console.log('USER DELETED');
    return ev.returnValue = 'Are you sure you want to close?';
    });
    
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.connected.providers !== prevState.connected.providers) {
      console.log('CHANGEDDDDD');
      this.setReload(true);
    }
    
    // // console.log('CONNECTION : ', PollData(this.props.id));
    // console.log('Updated ', this.state.connected.providers);
    // console.log('SAYAIN : ', this.state.overrideDate);
    if(this.state.overrideDate == true  && this.state.dates.length == 2){
      console.log('NAMEK : ', this.state.dates);
      this.setOverrideDate(false);
    }
  }

  render(){
  
  // console.log('FRUITS : ', this.state.dates);
  var Pnum = General1(this.state.allData, "Performance")[0];
  var PerformanceSugg = General1(this.state.allData, "Performance")[1];
  var Hnum = General1(this.state.allData, "Health")[0];
  var HealthSugg = General1(this.state.allData, "Health")[1];
  var Nnum = General1(this.state.allData, "Sleep")[0];
  var NutritionSugg = General1(this.state.allData, "Sleep")[1];
  return (
    <div className="flex h-screen overflow-hidden bg-blue-50">
      {/* Sidebar */}
      <Sidebar id={this.props.id} sidebarOpen={this.state.sidebarOpen} setSidebarOpen={this.setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={this.state.sidebarOpen} setSidebarOpen={this.setSidebarOpen} />

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
             
              {/* <Datepicker setDates = {this.setDates} setOverrideDate = {this.setOverrideDate} overrideDate = {this.state.overrideDate}/> */}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              

              <ImageSugg1 sugg = {NutritionSugg} number = {Nnum}/>
              <ImageSugg2 sugg = {PerformanceSugg} number = {Pnum}/>
              <ImageSugg3 sugg = {HealthSugg} number = {Hnum}/>
              {/* Line chart (TEST) */}
              {/* <DashboardTest addSugg = {this.addSugg} sugg = {NutritionSugg} id={this.props.id} setOverrideDate = {this.setOverrideDate} dates = {this.state.dates} overrideDate = {this.state.overrideDate} /> */}
              {/* Line chart (Acme Plus) */}
              <DashboardNutrition setReload = {this.setReload} reload = {this.checkFitness()} addSugg = {this.addSugg} sugg = {NutritionSugg} id={this.props.id} setOverrideDate = {this.setOverrideDate} dates = {this.state.dates} overrideDate = {this.state.overrideDate}/>
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 addSugg = {this.addSugg} sugg = {PerformanceSugg} id={this.props.id} setOverrideDate = {this.setOverrideDate} dates = {this.state.dates} overrideDate = {this.state.overrideDate} />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 addSugg = {this.addSugg} sugg = {HealthSugg} id={this.props.id} setOverrideDate = {this.setOverrideDate} dates = {this.state.dates} overrideDate = {this.state.overrideDate}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}};


export default DashboardMoz;
// export default () => {
//   return (
//       <DashboardMoz />
//   )
// }