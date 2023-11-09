import React from 'react';
import CustomersTable from './CustomersTable';
import '../App.css';
import { Box } from '@mui/material';
import AddCustomerButton from './AddCustomerButton';
import CustomersHeader from './CustomersHeader';
import { useState, useEffect, useRef } from 'react';

export default function Customers() {
  //Reload after adding a new customer
  const [reload, setReload] = useState(false);
  //Reload after updating an existing customer
  const [reloadAfterEdit, setReloadAfterEdit] = useState(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" width="90%" maxWidth="90%">
        <CustomersHeader />
        <AddCustomerButton setReloadFromCustomers={setReload} />
        <CustomersTable
          reloadStateFromCustomerToCustomersTable={reload}
          reloadAfterEditFromCustomers={reloadAfterEdit}
          setReloadAfterEditFromCustomers={setReloadAfterEdit}
        />
      </Box>
    </Box>
  );
}
