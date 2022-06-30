import React, { useEffect, useState } from 'react';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';

import Datepicker from './partials/actions/Datepicker';
import SleepAnalysis from './partials/dashboard/SleepAnalysis';
import SleepEfficiency from './partials/dashboard/SleepEfficiency';
import DietBreakdown from './partials/dashboard/DietBreakdown';
import DietAnalysis from './partials/dashboard/DietAnalysis';
import StepCounter from './partials/dashboard/StepCounter';
import SleepHeartRate from './partials/dashboard/SleepHeartRate';
import ActivityMinutes from './partials/dashboard/ActivityMinutes';

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
              <SleepAnalysis />
              {/* Sleep Heart Rate */}
              <SleepHeartRate />
              {/* < Sleep Efficiency /> */}
              <SleepEfficiency />

              {/* NUTRITION CARDS */}
              {/* Doughnut chart (Food Groups) */}
              <DietBreakdown />
              {/* Table (Diet Analysis) */}
              <DietAnalysis />

              {/* PERFORMANCE CARDS */}
              {/* Activity Minutes */}
              <ActivityMinutes />
              {/* Step/Distance tracker */}
              <StepCounter/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardMoz;