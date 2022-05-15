import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

// Import pages
import App2 from './App2.js';
import DashboardMoz from './tailwind-dashboard-template/src/pages/DashboardMoz';

function DashboardApp() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default DashboardApp;
