import React from 'react';
import { Box } from '@mui/material';
import StatisticsHeader from './StatisticsHeader';
import StatisticsBarChart from './StatisticsBarChart';

export default function Statistics() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        width="90%"
        maxWidth="90%"
        gap={5}
      >
        <StatisticsHeader />
        <StatisticsBarChart />
      </Box>
    </Box>
  );
}
