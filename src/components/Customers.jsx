import React from 'react';
import CustomersTable from './CustomersTable';
import '../App.css';
import { Box } from '@mui/material';
import AddCustomerButton from './AddCustomerButton';
import CustomersHeader from './CustomersHeader';
import { useState, useEffect, useRef } from 'react';
import ExportCustomesButton from './ExportCustomersButton';

export default function Customers() {
  //Reload after adding a new customer
  const [reload, setReload] = useState(false);
  //Reload after updating an existing customer
  const [reloadAfterEdit, setReloadAfterEdit] = useState(false);
  //Reload after adding a training
  const [reloadAfterTrainingAdding, setReloadAfterTrainingAdding] =
    useState(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        width="90%"
        maxWidth="90%"
        gap={5}
      >
        <CustomersHeader />
        <Box display="flex" justifyContent="flex-end" gap={0.5}>
          <ExportCustomesButton />
          <AddCustomerButton setReloadFromCustomers={setReload} />
        </Box>
        <CustomersTable
          reloadStateFromCustomerToCustomersTable={reload}
          reloadAfterEditFromCustomers={reloadAfterEdit}
          setReloadAfterEditFromCustomers={setReloadAfterEdit}
          reloadAfterTrainingAddingFromCustomers={reloadAfterTrainingAdding}
          setReloadAfterTrainingAddingFromCustomers={
            setReloadAfterTrainingAdding
          }
        />
      </Box>
    </Box>
  );
}
