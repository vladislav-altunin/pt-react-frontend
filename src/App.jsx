//terminal: npm run dev
import * as React from 'react';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Route, Routes } from 'react-router';
import Customers from './components/Customers';

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Customers />} />
      </Routes>
    </>
  );
}

export default App;
