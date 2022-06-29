import React, { useEffect, useState } from 'react';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';

import Datepicker from './partials/actions/Datepicker';
import DashboardCard01 from './partials/dashboard/DashboardNutrition';
import DashboardCard02 from './partials/dashboard/DashboardCard02';
import DashboardCard03 from './partials/dashboard/DashboardCard03';
import DashboardCard04 from './partials/dashboard/DashboardCard04';
import DashboardCard05 from './partials/dashboard/DashboardCard05';
import DashboardCardDietBreak from './partials/dashboard/DashboardCardDietBreak';
import DashboardCardDietAn from './partials/dashboard/DashboardCardDietAn';
import DashboardCard08 from './partials/dashboard/DashboardCard08';
import DashboardCard09 from './partials/dashboard/DashboardCard09';
import DashboardCard10 from './partials/dashboard/DashboardCard10';
import DashboardCard11 from './partials/dashboard/DashboardCard11';
import DashboardCard12 from './partials/dashboard/DashboardCard12';
import DashboardCard13 from './partials/dashboard/DashboardCard13';
import AnalysisREM from './components/Analysis/AnalysisREM';
import Analysis8 from './components/Analysis/Analysis8';
import AnalyticSteps from './components/Analysis/AnalyticsSteps.js';
import FinalCard from './partials/dashboard/FinalCard';
// import Banner from '../partials/Banner';

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
              <DashboardCard04 />
              {/* Sleep Heart Rate */}
              <DashboardCard11 />
              {/* < Sleep Efficiency /> */}
              <DashboardCard05 />

              {/* NUTRITION CARDS */}
              {/* Doughnut chart (Food Groups) */}
              <DashboardCardDietBreak />
              {/* Table (Diet Analysis) */}
              <DashboardCardDietAn />

              {/* PERFORMANCE CARDS */}
              {/* Activity Minutes */}
              <FinalCard />
              {/* Step/Distance tracker */}
              <DashboardCard09 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardMoz;