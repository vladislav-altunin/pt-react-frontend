import React from 'react';
import CustomersTable from './CustomersTable';
import '../App.css';
import { Box } from '@mui/material';
import AddCustomerButton from './AddCustomerButton';
import CustomersHeader from './CustomersHeader';

export default function Customers() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" width="90%" maxWidth="90%">
        <CustomersHeader />
        <AddCustomerButton />
        <CustomersTable />
      </Box>
    </Box>
  );
}
