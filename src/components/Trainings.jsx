import React from 'react';
import TrainingsTable from './TrainingsTable';
import TrainingsHeader from './TrainingsHeader';
import '../App.css';
import { Box, Typography } from '@mui/material';

export default function Trainings() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="90%"
        maxWidth="90%"
      >
        <TrainingsHeader />
        <TrainingsTable />
      </Box>
    </Box>
  );
}
