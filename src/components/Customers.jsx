import React from 'react';
import CustomersTable from './CustomersTable';
import '../App.css';
import { Typography } from '@mui/material';

export default function Customers() {
  return (
    <div className="tableComponent">
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>
      <CustomersTable />
    </div>
  );
}
