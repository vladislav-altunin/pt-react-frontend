//terminal: npm run dev
import * as React from 'react';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Route, Routes } from 'react-router';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import { Box } from '@mui/material';
import PtCalendar from './components/PtCalendar';

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/pt-react-frontend" element={<Customers />} />
        <Route path="/pt-react-frontend/customers" element={<Customers />} />
        <Route path="/pt-react-frontend/trainings" element={<Trainings />} />
        <Route path="/pt-react-frontend/calendar" element={<PtCalendar />} />
      </Routes>
    </>
  );
}

export default App;
