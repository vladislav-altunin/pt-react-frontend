import React from 'react';
import TrainingsTable from './TrainingsTable';
import '../App.css';
import { Typography } from '@mui/material';

export default function Trainings() {
  return (
    <div className="tableComponent">
      <Typography variant="h5" gutterBottom>
        Trainings
      </Typography>
      <TrainingsTable />
    </div>
  );
}
