import React, { useEffect, useState } from 'react';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';

import Datepicker from './partials/actions/Datepicker';
import sleepAnalysis from './partials/dashboard/sleepAnalysis';
import sleepEfficiency from './partials/dashboard/sleepEfficiency';
import dietBreakdown from './partials/dashboard/dietBreakdown';
import dietAnalysis from './partials/dashboard/dietAnalysis';
import stepCounter from './partials/dashboard/stepCounter';
import sleepHeartRate from './partials/dashboard/sleepHeartRate';
import activityMinutes from './partials/dashboard/activityMinutes';

function DashboardMoz(){

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-blue-100">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* HEALTH CARDS */}
              {/* Sleep Analysis */}
              <sleepAnalysis />
              {/* Sleep Heart Rate */}
              <sleepHeartRate />
              {/* < Sleep Efficiency /> */}
              <sleepEfficiency />

              {/* NUTRITION CARDS */}
              {/* Doughnut chart (Food Groups) */}
              <dietBreakdown />
              {/* Table (Diet Analysis) */}
              <dietAnalysis />

              {/* PERFORMANCE CARDS */}
              {/* Activity Minutes */}
              <activityMinutes />
              {/* Step/Distance tracker */}
              <stepCounter/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardMoz;