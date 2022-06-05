import React, { useEffect, useState } from 'react';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';

import Datepicker from './partials/actions/Datepicker';
import DashboardCard01 from './partials/dashboard/DashboardCard01';
import DashboardCard02 from './partials/dashboard/DashboardCard02';
import DashboardCard03 from './partials/dashboard/DashboardCard03';
import DashboardCard04 from './partials/dashboard/DashboardCard04';
import DashboardCard05 from './partials/dashboard/DashboardCard05';
import DashboardCard06 from './partials/dashboard/DashboardCard06';
import DashboardCard07 from './partials/dashboard/DashboardCard07';
import DashboardCard08 from './partials/dashboard/DashboardCard08';
import DashboardCard09 from './partials/dashboard/DashboardCard09';
import DashboardCard10 from './partials/dashboard/DashboardCard10';
import DashboardCard11 from './partials/dashboard/DashboardCard11';
import DashboardCard12 from './partials/dashboard/DashboardCard12';
import DashboardCard13 from './partials/dashboard/DashboardCard13';
import Analysis1 from './components/Analysis/Analysis1';
// import Banner from '../partials/Banner';

function DashboardMoz(){

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const test = [1,2,3,4,5,6,7];

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
              {/* Filter button */}
             
              <Datepicker />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* HEALTH CARDS */}
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* <Analysis1 /> */}

              {/* NUTRITION CARDS */}
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />

              {/* PERFORMANCE CARDS */}
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
            </div>

          </div>
        </main>

       
        {/* <Routes>
            <Route path="/test" element={<DashboardCard03 />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default DashboardMoz;